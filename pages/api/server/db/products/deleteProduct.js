const handleDeleteProduct = async (product) => {
    try {
        const response = await fetch(
            `/api/server/db/products/deleteProduct?id=${product.id}`,
            {
                method: 'DELETE',
            }
        );

        if (response.ok) {
            setProducts((prevProducts) =>
                prevProducts.filter((p) => p.id !== product.id)
            );
            toast.success('Produto deletado com sucesso!');
        } else {
            const errorData = await response.json();
            toast.error(errorData.error || 'Falha ao deletar o produto');
        }
    } catch (error) {
        toast.error('Erro ao deletar o produto');
    }
};
