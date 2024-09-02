import styles from './sidebar.module.css';
import {Box} from "@mui/material";
import {useDnD} from "../drag-and-drop/DnDContext";

export default function Sidebar() {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }

  return (
    <>
      <div className={styles.sidebar}>
        <Box sx={{
          width: '100%', height: '48px', backgroundColor: '#ff0', border: '2px solid #000',
          borderRadius: '6px', padding: '12px', cursor: '-webkit-grab'
        }} draggable onDragStart={ (e) => onDragStart(e, 'tag')}>
          Tag
        </Box>

        <div height={'20px'}>&nbsp;</div>

        <Box sx={{
          width: '100%', height: '48px', backgroundColor: '#0ff', border: '2px solid #000',
          borderRadius: '6px', padding: '12px', cursor: '-webkit-grab'
        }} draggable onDragStart={ (e) => onDragStart(e, 'path') }>
          Path
        </Box>

        <div height={'20px'}>&nbsp;</div>

        <Box sx={{
          width: '100%', height: '48px', backgroundColor: '#f0f', border: '2px solid #000',
          borderRadius: '6px', padding: '12px', cursor: '-webkit-grab'
        }} draggable onDragStart={ (e) => onDragStart(e, 'schema') }>
          Schema
        </Box>
      </div>
    </>
  );
}
