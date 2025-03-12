import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Stack,
  styled
} from '@mui/material';
import { Link } from "react-router-dom";

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
  const { user } = useSelector((state) => state.user);

  return (
    <ProfileCard>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' } }}>
          <ProfileAvatar
            src="https://s3-alpha-sig.figma.com/img/f5d1/626b/58c7efc77645ec3d92f9810aa546723d?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=acGbZeTMacggeZ2Hsyf2td~ia2LEUhRPcNXViWtacB0Sg1i5RUZa1xEp9MvUMslnkIjhNK~Ob1PwuEssyc6xXdQLu6SBszLtKrZ5yxEdkzwcyWrOWBPkDyFKWbR4xGqnpv4TMxOkGT3mfraH3jou1RyleINYrkxYXXnCzI74-zA3MIIOqOYupE8FfFyYn9ek~O23zNr41E6pXiuSo~Wk19IwCg2MZggpvQxzWxOCQsYF4rMEG5JfutvahKRS7gDy6MYjdlPdCcvnxr7SCrI7ziR6QylYEsnKUa3vbbTgfpu6ivMrEMmKPwWfiOcd7bUBM8HlE-NecDpB8nDGkK2XFg__"
            alt="Profile"
            variant="square"
          />

          <Stack spacing={0.5} sx={{ mt: { xs: 2, md: 0 } }}>
            <Typography variant="caption" color="text.secondary" align="left">
              Welcome
            </Typography>

            <Typography variant="h6" color="primary" fontWeight="medium" align="left">
              Ahmed Ali
            </Typography>

            <Typography variant="body2" color="text.secondary" align="left">
              {user?.phone || '8801710575743'}
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