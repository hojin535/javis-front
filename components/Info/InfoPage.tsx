"use client";
import {createContext, useContext, useEffect, useState} from "react";
import {Alert, Box, Card, CardContent, Snackbar} from "@mui/material";
import {BaseComponent} from "@/components/common/BaseComponent.tsx";
import {PageContent} from "@/components/common/PageContent.tsx";
import {BasicInfo} from "./BasicInfo.tsx";
import {MilitaryInfo} from "./MilitaryInfo.tsx";
import {ClubInfo} from "./ClubInfo.tsx";
import {AcademicInfo} from "./AcademicInfo.tsx";
import {AwardsInfo} from "./AwardsInfo.tsx";
import {useFetchData} from "@/hooks/useFetchData.tsx";

// Alert Context 생성
export const AlertContext = createContext();

// Alert Hook
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

const InfoCard = ({children}) => (
  <Card style={{marginBottom: "16px"}}>
    <CardContent>
      <div style={{marginTop: "10px"}}>{children}</div>
    </CardContent>
  </Card>
);

export const InfoPage = () => {
  // Alert 상태 관리
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const {fetchData} = useFetchData();
  const showAlert = (message, severity = "success") => {
    setAlert({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseAlert = () => {
    setAlert({...alert, open: false});
  };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInfo = async () => {
    try {
      setLoading(true);
      const response = await fetchData("/UserInfo");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  if (loading) {
    return (
      <BaseComponent>
        <PageContent>
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            Loading...
          </Box>
        </PageContent>
      </BaseComponent>
    );
  }

  return (
    <AlertContext.Provider value={{showAlert}}>
      <BaseComponent>
        <PageContent>
          <Box
            sx={{
              marginX: "auto",
              maxWidth: "1000px",
              minWidth: "1000px",
              width: "100%",
              paddingX: "16px",
            }}
          >
            <InfoCard>
              <BasicInfo basicInfo={data?.basicInfo}/>
            </InfoCard>

            <InfoCard>
              <MilitaryInfo militaryInfo={data?.militaryInfo}/>
            </InfoCard>

            <InfoCard title="수상">
              <AwardsInfo awardInfo={data?.awardInfo}/>
            </InfoCard>

            <InfoCard title="동아리/대외활동">
              <ClubInfo clubInfo={data?.clubInfo}/>
            </InfoCard>

            <InfoCard title="학적사항">
              <AcademicInfo academicInfo={data?.academicInfo}/>
            </InfoCard>
          </Box>
        </PageContent>
      </BaseComponent>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{vertical: "bottom", horizontal: "right"}}
      >
        <Alert severity={alert.severity} sx={{width: "100%"}}>
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
