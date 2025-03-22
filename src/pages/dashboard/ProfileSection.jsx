import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Stack,
  styled,
  Skeleton,
} from '@mui/material';
import { Link } from "react-router-dom";
import { getUserDetails } from "../../redux/auth/authSlice";
import { useEffect } from "react";

const ProfileCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#F5F6F8',
  borderRadius: theme.spacing(1),
  boxShadow: 'none',
}));

const DetailsButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
  borderRadius: theme.spacing(0.75),
  textTransform: 'none',
  padding: theme.spacing(0.5, 2),
  backgroundColor: '#FFECEA',
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.grey[200]}`,
  marginRight: theme.spacing(2),
}));

const ProfileSection = () => {
  const { user, token, userDetails, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetails(token));
  }, [dispatch, token]);
  return (
    <ProfileCard>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' } }}>

          {isLoading ? (
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: (theme) => theme.spacing(1),
                border: (theme) => `1px solid ${theme.palette.grey[200]}`,
                marginRight: (theme) => theme.spacing(2),
              }}
            >
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </Box>
          ) : (
            <ProfileAvatar
              src={userDetails?.profileImage}
              alt="Profile"
              variant="square"
            />
          )}
          <Stack spacing={0.5} sx={{ mt: { xs: 2, md: 0 } }}>
            <Typography variant="caption" color="text.secondary" align="left">
              Welcome
            </Typography>

            {isLoading ? (
              <Skeleton variant="text" width="60%" />
            ) : (
              <Typography variant="h6" color="primary" fontWeight="medium" align="left">
                {userDetails?.firstName || ""} {userDetails?.lastName || ""}
              </Typography>
            )}

            <Typography variant="body2" color="text.secondary" align="left">
              {user?.phone || ''}
            </Typography>

            <Typography variant="body2" color="text.secondary" align="left" sx={{ mt: 1 }}>
              You are subscribe on <Box component="span" fontWeight="medium">Monthly Pack.</Box>
            </Typography>

            <Typography variant="body2" color="text.secondary" align="left">
              Next renewal <Box component="span" color="primary.main" fontWeight="medium">31 December 2022</Box>
            </Typography>
          </Stack>
        </Box>
        <Link to='/doctor/profile'>
          <DetailsButton variant="outlined">
            Details
          </DetailsButton></Link>
      </CardContent>
    </ProfileCard>
  );
};

export default ProfileSection;