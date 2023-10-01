import {
  Backdrop,
  Box,
  Fade,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";

const OrderModal = ({
  open,
  handleClose,
  singleProduct,
  handleStatusChange,
  singleProductLoading,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "calc(100% - 50px)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  console.log(singleProduct);
  const handleChange = (event, id) => {
    handleStatusChange(event, id);
  };
  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          {!singleProductLoading ? (
            singleProduct ? (
              <>
                <Typography id="spring-modal-title" variant="h6" component="h2">
                  {singleProduct?.productName}
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="grid-cols-1 md:col-span-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ullam culpa expedita unde omnis, iure soluta laboriosam
                    rerum dignissimos saepe eveniet adipisci aliquid dolore
                    laborum accusamus animi enim. Vero commodi nisi ducimus
                    reprehenderit, mollitia hic voluptatibus nesciunt voluptates
                    illum minus, quia maiores, itaque amet quas autem optio
                    dignissimos. Quidem beatae ipsa expedita excepturi omnis,
                    porro dolorem ratione repellendus maxime eligendi, optio
                    est. Aliquid commodi ullam atque ad, quidem illo voluptas
                    quas delectus nesciunt, ipsam, reprehenderit voluptate!
                    Tempora vitae aut, eveniet molestias enim dolorem, iure,
                    cupiditate consequuntur voluptatem quaerat maiores. Sint
                    unde obcaecati enim autem sapiente cumque ea pariatur
                    reprehenderit sed exercitationem?
                  </div>
                  <div className="col-span-1">
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={singleProduct?.status}
                      label="Age"
                      onChange={event =>
                        handleChange(event, singleProduct.order_id)
                      }
                      style={{ width: "300px" }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="processing">Processing</MenuItem>
                      <MenuItem value="picked by currier">
                        Picked by currier
                      </MenuItem>
                      <MenuItem value="shifted">Shifted</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="canceled">Canceled</MenuItem>
                    </Select>
                  </div>
                </div>
              </>
            ) : (
              <h2 className="text-center font-bold ">
                No order found with this id.
              </h2>
            )
          ) : (
            "Loading..."
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default OrderModal;
