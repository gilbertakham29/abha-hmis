import {
  Box,
  Checkbox,
  Container,
  Grid,
  IconButton,
  Input,
  Modal,
  Typography,
} from "@mui/material";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHealthInformationType, initiateConsent } from "../../api/abha-api";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import ConsentAlert from "../alerts/consetAlert";
import { HealthInfoData } from "../../redux/reducer";
const style = {
  position: "absolute",
  left: 0,
  right: 0,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  px: 4,
  transform: "scale(0.9)",
  borderWidth: 1,
  width: "50%",
  py: 1,
  borderColor: "#BDBDBD",
};

function ConsentModal({
  isOpen,
  isClose,
}: {
  isOpen: boolean;
  isClose: () => void;
}) {
  //const dateString = new Date();
  //const date: Date = dateString;

  const tomorrow = new Date();

  type RootState = {
    getHealthInfoData: HealthInfoData[];
  };
  const healthInfo = useSelector((state: RootState) => state.getHealthInfoData);
  const [selectedValues, setSelectedValues] = useState({ hiTypesList: [""] });
  const [healthIdValue, setHealthIdValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [consentAlert, setConsentAlert] = useState(false);
  const dispatch = useDispatch();
  const handleCheckboxChange = (value: string) => {
    setSelectedValues((prevState) => {
      if (prevState.hiTypesList.includes(value)) {
        return {
          hiTypesList: prevState.hiTypesList.filter((item) => item !== value),
        };
      } else {
        return { hiTypesList: [value] };
      }
    });
  };
  const handleHealthId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHealthIdValue(event.target.value);
  };

  const [formData, setFormData] = useState({
    healthId: "",
    facilityId: "IN1410000107",
    requesterName: "",
    requesterType: "REGNO",
    requesterId: "MN20200299",
    permissionFromDate: new Date(),
    permissionToDate: new Date(),
    permissionExpiryDate: new Date(),
    hiTypesList: [],
  });
  const handleFromDateChange = (date: Date | null) => {
    if (date) {
      setFormData({
        ...formData,
        permissionFromDate: date,
      });
    }
  };
  const handleToDateChange = (date: Date | null) => {
    if (date) {
      setFormData({
        ...formData,
        permissionToDate: date,
      });
    }
  };

  const handleFromExpiryChange = (date: Date | null) => {
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date) {
      setFormData({
        ...formData,
        permissionExpiryDate: date,
      });
    }
  };

  const handleFormData =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  const handleSubmit = async () => {
    setLoading(true);
    const result = await initiateConsent(
      healthIdValue,
      formData.facilityId,
      formData.requesterName,
      formData.requesterId,
      formData.requesterType,
      formData.permissionFromDate,
      formData.permissionToDate,
      formData.permissionExpiryDate,
      selectedValues.hiTypesList
    );
    setTimeout(() => {
      setLoading(false);
      setConsentAlert(true);
      setTimeout(() => {
        setConsentAlert(false);
        isClose;
      }, 3000);
    }, 2000);

    console.log(result);
  };
  useEffect(() => {
    const fetchData = () => {
      const response = getHealthInformationType(dispatch);
      console.log(response);
    };
    fetchData();
  }, [dispatch]);
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={isClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={style}>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {" "}
              <Typography
                variant="h5"
                component="h5"
                sx={{ fontSize: "1.3rem" }}
              >
                Consent Request Form
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={isClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                border: "1px solid #000",
                borderBottom: 1,
                borderColor: "#BDBDBD",
                mt: 1,
              }}
            ></Box>
          </Box>

          <Typography
            variant="h2"
            component="h2"
            sx={{ fontSize: "0.9rem", mt: 2 }}
          >
            All the fields are mandatory
          </Typography>

          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: 1,
              gap: 8,
            }}
          >
            <Typography variant="h2" sx={{ fontSize: "0.9rem" }}>
              Patient Identifier
            </Typography>
            <Input
              sx={{ width: "40vh", mb: 2 }}
              size="small"
              value={healthIdValue}
              onChange={handleHealthId}
            />
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: 2,
              gap: 7,
            }}
          >
            <Typography variant="h2" sx={{ fontSize: "0.9rem" }}>
              Requester Name
            </Typography>

            <Input
              sx={{ width: "50vh", mb: 2 }}
              id="size-small-standard"
              size="small"
              value={formData.requesterName}
              onChange={handleFormData("requesterName")}
              defaultValue="Care Management"
            />
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: 2,
              gap: 8,
            }}
          >
            <Typography variant="h2" sx={{ fontSize: "0.9rem" }}>
              Health info form
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                sx={{ mb: 2 }}
                value={new Date(formData.permissionFromDate)}
                onChange={handleFromDateChange}
                slotProps={{ textField: { variant: "standard" } }}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: 2,
              gap: 10,
            }}
          >
            <Typography variant="h2" sx={{ fontSize: "0.9rem" }}>
              Health info to
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                sx={{ mb: 2 }}
                value={new Date(formData.permissionToDate)}
                onChange={handleToDateChange}
                slotProps={{ textField: { variant: "standard" } }}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              mt: 2,
              gap: 10,
            }}
          >
            <Typography variant="h2" sx={{ fontSize: "0.9rem" }}>
              Health info type
            </Typography>

            <Grid container rowSpacing={1}>
              {healthInfo.map((info) => (
                <Grid item xs={6}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      checked={selectedValues.hiTypesList.includes(info.code)}
                      onChange={() => handleCheckboxChange(info.code)}
                    />
                    <Typography
                      sx={{ fontSize: "0.8rem" }}
                      key={info.healthInformationTypeId}
                    >
                      {info.display}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: 2,
              gap: 10,
            }}
          >
            <Typography variant="h2" sx={{ fontSize: "0.9rem" }}>
              Consent expiry
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                value={new Date(formData.permissionExpiryDate)}
                onChange={handleFromExpiryChange}
                sx={{ mb: 2 }}
                slotProps={{ textField: { variant: "standard" } }}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: 2,
              mx: 28,
              gap: 10,
            }}
          >
            <LoadingButton
              variant="contained"
              size="medium"
              loading={loading}
              disabled={loading}
              sx={{
                backgroundColor: "#4CAF50",
                ":hover": { backgroundColor: "#43A047" },
              }}
              onClick={handleSubmit}
            >
              Request consent
            </LoadingButton>
          </Box>
        </Container>
      </Modal>
      {consentAlert && <ConsentAlert isOpen={consentAlert} />}
    </div>
  );
}

export default ConsentModal;
