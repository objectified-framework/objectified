import {
  Button,
  Checkbox,
  DialogTitle, FormControl, FormControlLabel, IconButton,
  InputLabel, MenuItem,
  Select,
  Stack,
  Typography,
  Box,
  TextField,
  LinearProgress,
} from '@mui/material';
import Image from "next/image";
import TopHeader from "@/app/components/TopHeader";
import SideBar from "@/app/components/SideBar";
import ContentArea from "@/app/components/ContentArea";

export default function Home() {
  return (
    <div style={{ display: 'flex', width: '100%' }}
      className={'bg-white text-black'}>
      <TopHeader/>
      <ContentArea/>
    </div>
  );
}
