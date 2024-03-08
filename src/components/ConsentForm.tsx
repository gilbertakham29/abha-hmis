import { Box, Button } from "@mui/material";
import Navbar from "./Navbar";
import { useState } from "react";
import ConsentModal from "./modals/ConsentModal";
import ConsentTable from "./ConsentTable";
function ConsentForm() {
  const initialState = {
    abhaGenerate: false,
    openModal: false,
  };
  const [state, setState] = useState(initialState);
  const { openModal } = state;
  const handleModal = () => {
    setState({
      ...state,
      openModal: true,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      openModal: false,
    });
  };
  return (
    <Box>
      <Navbar />
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#00E676",
          ":hover": { backgroundColor: "#00C853" },
          mt: 3,
        }}
        onClick={handleModal}
      >
        NEW CONSENT REQUEST
      </Button>

      {openModal && <ConsentModal isOpen={openModal} isClose={handleClose} />}
      <ConsentTable />
    </Box>
  );
}

export default ConsentForm;
