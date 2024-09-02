import styles from './sidebar.module.css';
import {Box} from "@mui/material";

export default function Sidebar() {
  return (
    <>
      <div className={styles.sidebar}>
        <Box sx={{
          width: '100%', height: '48px', backgroundColor: '#ff0', border: '2px solid #000',
          borderRadius: '6px', padding: '12px'
        }}>
          Tag
        </Box>

        <div height={'20px'}>&nbsp;</div>

        <Box sx={{
          width: '100%', height: '48px', backgroundColor: '#0ff', border: '2px solid #000',
          borderRadius: '6px', padding: '12px'
        }}>
          Path
        </Box>

        <div height={'20px'}>&nbsp;</div>

        <Box sx={{
          width: '100%', height: '48px', backgroundColor: '#f0f', border: '2px solid #000',
          borderRadius: '6px', padding: '12px'
        }}>
          Schema
        </Box>
      </div>
    </>
  );
}
