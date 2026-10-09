import { useState, useEffect } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import styles from "./styles.module.scss";

const DraggableRow = ({
  category,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  handleEditClick,
  handleDeleteClick,
  deletingId,
  isDragging,
  dragOverIndex,
}) => {
  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
    onDragStart(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    onDragOver(index);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onDrop(index);
  };

  const handleDragEnd = () => {
    onDragEnd();
  };

  const isBeingDragged = isDragging === index;
  const isDropTarget = dragOverIndex === index;

  return (
    <tr
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      className={`
        ${isBeingDragged ? styles.draggingRow : ""} 
        ${isDropTarget ? styles.dropTarget : ""}
      `}
      style={{
        opacity: isBeingDragged ? 0.5 : 1,
        backgroundColor: isDropTarget ? "#e3f2fd" : "transparent",
        cursor: "move",
        transition: "all 0.2s ease",
        border: isDropTarget ? "2px dashed #2196f3" : "1px solid #dee2e6",
      }}
    >
      <td>
        <div className={styles.categoryName}>
          <span className={styles.dragHandle} title="Arraste para reordenar">
            ⋮⋮
          </span>
          <strong>{category.name}</strong>
          <span className="badge bg-primary ms-2">#{index + 1}</span>
        </div>
      </td>
      <td>{category.description || "Sem descrição"}</td>
      {/* <td>{category.category?.name || "N/A"}</td> */}
      <td>
        <div className={styles.container}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleEditClick(category)}
          >
            Editar
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDeleteClick(category.id)}
            disabled={deletingId === category.id}
          >
            {deletingId === category.id ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Excluir"
            )}
          </Button>
        </div>
      </td>
    </tr>
  );
};

export const DraggableCategoriesTable = ({
  categoriesProps = [],
  handleEditClick,
  handleDeleteClick,
  deletingId,
  onReorder,
}) => {
  const [categories, setCategories] = useState(categoriesProps);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  useEffect(() => {
    setCategories(categoriesProps);
  }, [categoriesProps]);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
    console.log(`🔄 Iniciando arraste da categoria na posição ${index + 1}`);
  };

  const handleDragOver = (index) => {
    setDragOverIndex(index);
  };

  const handleDrop = (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex) {
      return;
    }

    const newCategories = [...categories];
    const draggedCategory = newCategories[draggedIndex];

    // Remove o item da posição original
    newCategories.splice(draggedIndex, 1);
    // Insere na nova posição
    newCategories.splice(dropIndex, 0, draggedCategory);

    console.log(
      `📋 Categoria "${draggedCategory.name}" movida da posição ${
        draggedIndex + 1
      } para ${dropIndex + 1}`
    );
    console.log(
      "🔢 Nova ordem:",
      newCategories.map((cat, idx) => `${cat.name}(${idx + 1})`)
    );

    setCategories(newCategories);
    onReorder(newCategories);

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="app-container">
      <div className="table-responsive">
        <Table className="table table-bordered text-nowrap border-bottom">
          <thead className="table-primary">
            <tr>
              <th style={{ width: "35%" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "10px", opacity: 0.7 }}>⋮⋮</span>
                  <strong>Nome (Posição)</strong>
                </div>
              </th>
              <th style={{ width: "30%" }}>
                <strong>Descrição</strong>
              </th>
              {/* <th style={{ width: "15%" }}>
                <strong>Categoria Pai</strong>
              </th> */}
              <th style={{ width: "20%" }}>
                <strong>Ações</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {categories && categories.length > 0 ? (
              categories.map((category, index) => (
                <DraggableRow
                  key={category.id}
                  index={index}
                  category={category}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onDragEnd={handleDragEnd}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                  deletingId={deletingId}
                  isDragging={draggedIndex}
                  dragOverIndex={dragOverIndex}
                />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-5">
                  <div className="text-muted">
                    <i className="fas fa-folder-open fa-3x mb-3"></i>
                    <br />
                    <h5>Nenhuma categoria encontrada</h5>
                    <p>
                      Adicione sua primeira categoria clicando no botão acima.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <div className="mt-3 p-2 bg-info bg-opacity-10 rounded">
        <div className="row">
          <div className="col-md-6">
            <small className="text-muted">
              📊 <strong>Total:</strong> {categories.length} categoria(s)
            </small>
          </div>
          <div className="col-md-6">
            <small className="text-muted">
              <strong>Ordem atual:</strong>{" "}
              {categories
                .slice(0, 3)
                .map((cat, idx) => `${cat.name}(${idx + 1})`)
                .join(", ")}
              {categories.length > 3 && "..."}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
