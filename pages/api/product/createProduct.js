import { prisma } from "@/pages/api/server/db/prisma";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import multer from "multer";
import { createRouter, expressWrapper } from "next-connect";
import { storage } from "../../../shared/firebase/firebaseapi";

export const config = {
  api: {
    bodyParser: false, // Needed for multer to work
  },
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

const uploadImageToStorage = async (fileName, fileBuffer) => {
  const maxFileNameLength = 50; // Define a maximum length for the file name
  const sanitizedFileName = fileName
    .substring(0, maxFileNameLength) // Truncate to max length
    .replace(/[^a-zA-Z0-9-_]/g, ""); // Remove special characters for safety

  const destinationWithHash = `images/${sanitizedFileName}-${Date.now()}.webp`;
  const storageRef = ref(storage, destinationWithHash);

  await uploadBytes(storageRef, fileBuffer, {
    contentType: "image/webp",
  });

  const publicUrlImage = await getDownloadURL(storageRef);
  return publicUrlImage;
};

const router = createRouter();

router.use(expressWrapper(upload.single("img")));

router.post(async (req, res) => {
  try {
    const file = req.file;
    const { title, price, categoryId, description, variantId, variantValues } =
      req.body;

    if (!title || !categoryId || !description) {
      return res.status(400).json({
        error: "Campos obrigatórios: título, categoria e descrição",
      });
    }

    // Verificar se preço é necessário quando não há variantes
    if (!variantId && !price) {
      return res.status(400).json({
        error: "Preço é obrigatório para produtos sem variantes",
      });
    }

    let imgUrl = "";
    if (file) {
      const fileName = file.originalname.split(".")[0];
      const imgBuffer = file.buffer;
      imgUrl = await uploadImageToStorage(fileName, imgBuffer);
    }

    // Criar o produto base
    const productData = {
      title,
      description,
      price: variantId ? 0 : parseFloat(price), // Se tiver variante, preço base é 0
      img: imgUrl,
      categoryId: parseInt(categoryId, 10),
      status: "IN_STOCK",
    };

    // Iniciar uma transação para garantir operações atômicas
    const result = await prisma.$transaction(async (prisma) => {
      // Criar o produto
      const product = await prisma.product.create({
        data: productData,
        include: {
          category: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });

      // Se tiver variantes, associar o produto às variantes
      if (variantId) {
        const variantIdNum = parseInt(variantId, 10);

        // Associar o produto à variante
        await prisma.variant.update({
          where: { id: variantIdNum },
          data: { productId: product.id },
        });

        // Se enviou valores de variante com preços
        if (variantValues && typeof variantValues === "string") {
          try {
            const parsedVariantValues = JSON.parse(variantValues);

            // Criar associações ProductVariantValue para cada valor de variante
            for (const val of parsedVariantValues) {
              await prisma.productVariantValue.create({
                data: {
                  productId: product.id,
                  variantValueId: parseInt(val.id, 10),
                  price: parseFloat(val.price) || 0,
                  stock: parseInt(val.stock, 10) || 0,
                },
              });
            }
          } catch (e) {
            console.error("Erro ao processar valores de variante:", e);
          }
        }

        // Buscar o produto completo com suas variantes para retornar
        const productWithVariants = await prisma.product.findUnique({
          where: { id: product.id },
          include: {
            category: {
              select: {
                name: true,
                id: true,
              },
            },
            productVariantValues: {
              include: {
                variantValue: true,
              },
            },
            variants: true,
          },
        });

        return productWithVariants;
      }

      return product;
    });

    res.status(201).json({ success: true, product: result });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    return res.status(500).json({ error: err.message });
  },
});
