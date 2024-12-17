import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function ConfirmationPopUp({
  open,
  setOpen,
  title = "Confirm Action",
  content = "Are you sure you want to proceed?",
  onAgree,
  onDisagree,
  agreeText = "Agree",
  disagreeText = "Cancel",
  type = "default",
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
  };

  const getDialogStyles = () => {
    switch (type) {
      case "warning":
        return {
          color: theme.palette.warning.main,
          icon: <WarningAmberIcon fontSize="large" />,
        };
      case "error":
        return {
          color: theme.palette.error.main,
          icon: <ErrorOutlineIcon fontSize="large" />,
        };
      default:
        return { color: theme.palette.text.primary, icon: null };
    }
  };

  const { color, icon } = getDialogStyles();

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        sx: {
          padding: 3,
          borderRadius: 3,
          maxWidth: 500,
          width: "100%",
          background: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
        },
      }}
    >
      <DialogTitle
        id="responsive-dialog-title"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          color,
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        {icon}
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            fontSize: "1rem",
            color: theme.palette.text.secondary,
            lineHeight: 1.6,
          }}
        >
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end", mt: 2 }}>
        <Button
          onClick={onDisagree || handleClose}
          sx={{
            fontSize: "0.9rem",
            textTransform: "none",
            color: theme.palette.text.primary,
          }}
        >
          {disagreeText}
        </Button>
        <Button
          onClick={onAgree || handleClose}
          variant={type === "error" ? "contained" : "outlined"}
          sx={{
            fontSize: "0.9rem",
            textTransform: "none",
            color: type === "error" ? theme.palette.common.white : undefined,
            backgroundColor:
              type === "error" ? theme.palette.error.main : undefined,
            "&:hover": {
              backgroundColor:
                type === "error"
                  ? theme.palette.error.dark
                  : theme.palette.action.hover,
            },
          }}
        >
          {agreeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
