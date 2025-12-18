import * as React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { COLORS } from "../../constants";
// import RestoreIcon from '@mui/icons-material/Restore';
// import PieChartIcon from '@mui/icons-material/PieChart';

let editNotes = "/icons/note_in_folder_icon.png";
let piechartIcon = "/icons/pie_chart_icon.png";

interface BottomNavigationBarProps {
  currentView: "dialogue" | "dashboard" | "reports";
  onTabChange: (view: "dialogue" | "dashboard" | "reports") => void;
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  currentView,
  onTabChange,
}) => {
  // const [value, setValue] = React.useState('reports');

  // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  //   setValue(newValue);
  //   if (newValue === 'reports' || newValue === 'history') {
  //       onTabChange(newValue);
  //   }
  // };

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: "dialogue" | "dashboard" | "reports"
  ) => {
    onTabChange(newValue);
  };

  return (
    // <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
    //   <BottomNavigation sx={{ width: '100%' }} value={currentView} onChange={handleChange} >
    //     <BottomNavigationAction
    //       label="Reports"
    //       value="reports"
    //       // icon={<PieChartIcon />}
    //       icon = {<img src={editNotes} width={24} height={24}></img>}
    //       sx={value==="reports" && {background:COLORS.grey2}}
    //     />
    //     <BottomNavigationAction
    //       label="Dashboard"
    //       value="dashboard"
    //       // icon={<PieChartIcon />}
    //       icon = {<img src={piechartIcon} width={24} height={24}></img>}
    //       sx={value==="dashboard" && {background:COLORS.grey2}}
    //     />
    //   </BottomNavigation>
    // </Paper>

    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        sx={{ width: "100%" }}
        value={currentView}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="New Dialogue"
          value="dialogue"
          icon={<img src={editNotes} width={24} height={24}></img>}
          sx={currentView === "dialogue" && { background: COLORS.grey2 }}
        />
        <BottomNavigationAction
          label="Dashboard"
          value="dashboard"
          icon={<img src={piechartIcon} width={24} height={24}></img>}
          sx={currentView === "dashboard" && { background: COLORS.grey2 }}
        />
        <BottomNavigationAction
          label="Reports"
          value="reports"
          icon={<img src={editNotes} width={24} height={24}></img>}
          sx={currentView === "reports" && { background: COLORS.grey2 }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigationBar;
