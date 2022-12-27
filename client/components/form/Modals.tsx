import styled from "@emotion/styled";
import Box, { BoxProps } from "@mui/material/Box";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiModal from "@mui/material/Modal";
import { ComponentProps, ReactNode } from "react";
import { PopupState, usePopupState } from "material-ui-popup-state/hooks";
import { Button, SxProps, Typography } from "@mui/material";

export type ModalSize = "large" | "fluid" | "small" | string;

const defaultSize = "400px";

function calculateWidth(size: ModalSize) {
  if (size === "large") {
    return "670px";
  } else if (size === "fluid") {
    return "auto";
  } else if (size === "small") {
    return defaultSize;
  }

  return size;
}

const ModalContainer = styled(Box)<{ size: ModalSize }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${({ size }) => calculateWidth(size)};
  transform: translate(-50%, -50%);
  ${({ size }) =>
    size === "fluid" &&
    `
    min-width: 250px;
    width: 75%;
    max-width: 500px;
  `}
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: ${({ theme }) => theme.spacing(0.25)};
  max-height: calc(80vh - ${({ theme }) => theme.spacing(4)});
  overflow-y: auto;
  &.top-position {
    top: 10%;
    transform: translate(-50%, 0);
  }
  color: ${({ theme }) => theme.palette.text.primary};
`;

const ScrollableModalContainer = styled(ModalContainer)`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(4, 0)};
`;

const StyledDialogTitle = styled(MuiDialogTitle)`
  font-weight: 700;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ScrollableContainer = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

export type ModalPosition = "center" | "top";

export type DialogModalProps = Omit<
  ComponentProps<typeof MuiModal>,
  "children" | "onClose" | "title" | "sx"
> & {
  size?: ModalSize;
  children: any;
  title?: string | ReactNode;
  position?: ModalPosition;
  noPadding?: boolean;
  onClose: () => void;
  sx?: BoxProps;
};

export function DialogModal({
  children,
  position = "center",
  size = defaultSize,
  title,
  sx = {
    height: "100%",
  },
  ...props
}: DialogModalProps) {
  return (
    <MuiModal {...props}>
      <ModalContainer
        size={size}
        className={position === "center" ? "center-position" : "top-position"}
        p={{
          xs: 2,
          md: 4,
        }}
        {...sx}
      >
        {title && <DialogTitle>{title}</DialogTitle>}
        {children}
      </ModalContainer>
    </MuiModal>
  );
}

export function ScrollableModal({
  children,
  size = defaultSize,
  title,
  ...props
}: DialogModalProps) {
  return (
    <MuiModal {...props}>
      <div>
        <ScrollableModalContainer size={size}>
          {title && (
            <Box px={4}>
              <DialogTitle>{title}</DialogTitle>
            </Box>
          )}
          <ScrollableContainer>{children}</ScrollableContainer>
        </ScrollableModalContainer>
      </div>
    </MuiModal>
  );
}

export function DialogTitle({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: any;
}) {
  return (
    <StyledDialogTitle
      sx={{
        ...sx,
        padding: 0,
        mb: {
          xs: 1,
          md: 2,
        },
      }}
    >
      {children}
    </StyledDialogTitle>
  );
}

export function FormModal({
  popupId,
  button,
  children,
  buttonSx = {},
  onClose,
  ...props
}: {
  children: (popupState: PopupState) => ReactNode;
  button: ReactNode;
  popupId: string;
} & Partial<Omit<DialogModalProps, "children">> & { buttonSx?: SxProps }) {
  const popupState = usePopupState({
    variant: "popover",
    popupId,
  });

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        width="fit-content"
        onClick={() => {
          popupState.open();
        }}
        sx={buttonSx}
      >
        {button}
      </Box>
      <DialogModal
        size={props.size ?? "fluid"}
        onClose={() => {
          onClose?.();
          popupState.close();
        }}
        open={popupState.isOpen}
        {...props}
      >
        {children(popupState)}
      </DialogModal>
    </>
  );
}

export type ConfirmDeleteModalProps = Pick<
  DialogModalProps,
  "onClose" | "open"
> & {
  entity?: string;
  question?: string | ReactNode;
  buttonText?: string;
  title?: string;
  onConfirm: () => void;
};

export function ConfirmDeleteModal({
  onClose,
  open,
  question,
  buttonText = "Delete",
  title,
  onConfirm,
  entity,
}: ConfirmDeleteModalProps) {
  function _onConfirm() {
    onConfirm();
    onClose();
  }

  return (
    <DialogModal
      open={open}
      onClose={onClose}
      title={title ?? `Delete ${entity}`}
      size="fluid"
      sx={{
        height: "fit-content",
        width: "fit-content",
        minWidth: 200,
        maxWidth: 500,
      }}
    >
      <Typography
        sx={{
          opacity: 0.75,
        }}
      >
        {question ??
          `Are you sure you want to delete your ${entity}? This action can't be undone`}
      </Typography>

      <Box sx={{ columnSpacing: 2, mt: 2, display: "flex" }}>
        <Button
          color="error"
          sx={{ mr: 1, fontWeight: "bold" }}
          onClick={_onConfirm}
        >
          {buttonText ?? "Delete"}
        </Button>

        <Button color="secondary" variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </DialogModal>
  );
}
