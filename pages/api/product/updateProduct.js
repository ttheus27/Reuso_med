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
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadImageToStorage = async (fileName, fileBuffer) => {
  const destinationWithHash = `images/${fileName}-${Date.now()}.webp`;
  const storageRef = ref(storage, destinationWithHash);

  await uploadBytes(storageRef, fileBuffer, {
    contentType: "image/webp",
  });

  const publicUrlImage = await getDownloadURL(storageRef);
  return publicUrlImage;
};

const router = createRouter();

router.use(expressWrapper(upload.single("img")));

// GET /api/product/[id]
// Obter informações completas do produto, incluindo variantes e valores
router.get(async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "ID do produto é obrigatório" });
    }

    const productId = parseInt(id, 10);
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: {
          select: { name: true, id: true },
        },
        variants: {
          include: {
            values: {
              include: {
                productVariantValues: {
                  where: { productId: productId },
                },
              },
            },
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("Erro ao obter produto:", error);
    res.status(500).json({ error: "Erro ao obter produto" });
  }
});

// PUT /api/product/[id]
// PUT /api/product/[id]
router.put(async (req, res) => {
  try {
    const { id } = req.query;
    const {
      title,
      description,
      price,
      quantity,
      categoryId,
      variantId,
      variantValues,
    } = req.body;

    if (!id || !title || !description || !categoryId) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios estão faltando" });
    }

    const productId = parseInt(id, 10);
    let imgUrl = null;

    if (req.file) {
      const fileName = req.file.originalname.split(".")[0];
      const imgBuffer = req.file.buffer;
      imgUrl = await uploadImageToStorage(fileName, imgBuffer);
    }

    let parsedVariantValues = [];
    if (variantValues) {
      try {
        parsedVariantValues = JSON.parse(variantValues);
      } catch (error) {
        return res
          .status(400)
          .json({ error: "Formato inválido de variantValues" });
      }
    }

    // Lógica de atualização
    await prisma.$transaction(async (tx) => {
      let updatedProduct;

      if (variantId) {
        // Com variante, price e quantity do produto são zerados
        updatedProduct = await tx.product.update({
          where: { id: productId },
          data: {
            title,
            description,
            price: 0,
            quantity: 0,
            img: imgUrl || undefined,
            categoryId: parseInt(categoryId, 10),
            accountEmail: req.body.accountEmail || undefined,
            accountPassword: req.body.accountPassword || undefined,
          },
          include: {
            category: {
              select: { name: true, id: true },
            },
          },
        });

        // Obter valores existentes no banco de dados
        const existingValues = await tx.productVariantValue.findMany({
          where: { productId: productId },
        });

        const valuesToUpdate = [];
        const valuesToCreate = [];
        const existingIds = new Set(
          existingValues.map((val) => val.variantValueId)
        );

        // Processar valores enviados no payload
        for (const val of parsedVariantValues) {
          const variantValueId = parseInt(val.id, 10);
          let valPrice = parseFloat(val.price || "0");
          let valStock = parseInt(val.stock || "0", 10);

          if (isNaN(valPrice)) valPrice = 0;
          if (isNaN(valStock)) valStock = 0;

          if (existingIds.has(variantValueId)) {
            // Atualizar valores existentes
            valuesToUpdate.push({
              variantValueId,
              price: valPrice,
              stock: valStock,
            });
          } else {
            // Criar novos valores
            valuesToCreate.push({
              variantValueId,
              price: valPrice,
              stock: valStock,
            });
          }
        }

        // Atualizar valores existentes
        for (const value of valuesToUpdate) {
          await tx.productVariantValue.updateMany({
            where: {
              productId: productId,
              variantValueId: value.variantValueId,
            },
            data: {
              price: value.price,
              stock: value.stock,
            },
          });
        }

        // Criar novos valores
        for (const value of valuesToCreate) {
          await tx.productVariantValue.create({
            data: {
              productId: productId,
              variantValueId: value.variantValueId,
              price: value.price,
              stock: value.stock,
            },
          });
        }

        // Remover valores que não estão mais no payload
        const newVariantIds = new Set(
          parsedVariantValues.map((val) => parseInt(val.id, 10))
        );
        const valuesToRemove = existingValues.filter(
          (val) => !newVariantIds.has(val.variantValueId)
        );

        for (const value of valuesToRemove) {
          await tx.productVariantValue.delete({
            where: {
              id: value.id,
            },
          });
        }

        res.status(200).json({ success: true, product: updatedProduct });
      } else {
        // Sem variante, atualiza normalmente price e quantity
        const parsedPrice = parseFloat(price || "0");
        const parsedQuantity = parseInt(quantity || "0", 10);

        updatedProduct = await tx.product.update({
          where: { id: productId },
          data: {
            title,
            description,
            price: parsedPrice,
            quantity: parsedQuantity,
            img: imgUrl || undefined,
            categoryId: parseInt(categoryId, 10),
            accountEmail: req.body.accountEmail || undefined,
            accountPassword: req.body.accountPassword || undefined,
          },
          include: {
            category: {
              select: { name: true, id: true },
            },
          },
        });

        // Se não tem varianteId, garante que não haja ProductVariantValues remanescentes
        await tx.productVariantValue.deleteMany({
          where: { productId: productId },
        });

        res.status(200).json({ success: true, product: updatedProduct });
      }
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    return res.status(500).json({ error: err.message });
  },
});
