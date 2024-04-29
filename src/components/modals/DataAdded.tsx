import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React, { JSXElementConstructor } from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<
      JSXElementConstructor<HTMLInputElement>,
      JSXElementConstructor<HTMLInputElement>
    >;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DataModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        sx={{
          display: "inline-flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 1,
        }}
      >
        {" "}
        <CheckCircleIcon sx={{ color: "#00E676" }} />
        {"Patient Registered successfully."}
      </DialogTitle>

      <DialogActions>
        <Button variant="contained" size="small" onClick={onClose}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DataModal;
