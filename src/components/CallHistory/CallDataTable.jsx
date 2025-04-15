import React from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    Chip,
    FormControl,
    Select,
    MenuItem,
    Button,
    useMediaQuery,
    useTheme
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const data = [
    { 
        id: '01', 
        name: 'Sakila Chowdhury', 
        duration: '0h 23m 08s', 
        date: '12 December 2023', 
        time: '05:44 PM', 
        status: 'Completed' 
      },
      { 
        id: '02', 
        name: 'Ashique Mahmud', 
        duration: '0h 23m 08s', 
        date: '16 December 2023', 
        time: '05:44 PM', 
        status: 'Completed' 
      },
      { 
        id: '03', 
        name: 'Subrata Roy', 
        duration: '0h 23m 08s', 
        date: '22 December 2023', 
        time: '05:44 PM', 
        status: 'Dropped' 
      },
      { 
        id: '04', 
        name: 'Abdul Alim Mia', 
        duration: '0h 23m 08s', 
        date: '22 December 2023', 
        time: '05:44 PM', 
        status: 'Completed' 
      },
      { 
        id: '05', 
        name: 'Sohana Chowdhury', 
        duration: '0h 23m 08s', 
        date: '22 December 2023', 
        time: '05:44 PM', 
        status: 'Dropped' 
      },
      { 
        id: '06', 
        name: 'Rony Saha', 
        duration: '0h 23m 08s', 
        date: '22 December 2023', 
        time: '05:44 PM', 
        status: 'Dropped' 
      },
];

const totalItems = 1250;

export default function CallDataTable() {
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const startItem = (page - 1) * rowsPerPage + 1;
    const endItem = Math.min(page * rowsPerPage, totalItems);

    return (
        <Box sx={{ 
            width: '100%', 
            borderRadius: 2,
            overflow: 'hidden'
        }}>
            <TableContainer sx={{ 
                bgcolor: 'white', 
                borderRadius: 1, 
                mb: 2,
                width: '100%'
            }}>
                <Table sx={{ 
                    width: '100%',
                    tableLayout: 'auto' // Allows cells to shrink naturally
                }}>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { bgcolor: '#f9f9f9' },
                                }}
                            >
                                <TableCell sx={{ 
                                    pl: 3,
                                    whiteSpace: 'nowrap',
                                    minWidth: '50px'
                                }}>
                                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                                        {row.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1" sx={{ 
                                        color: '#2c3e50', 
                                        fontWeight: 500,
                                        fontSize: isSmallScreen ? '0.875rem' : '1rem'
                                    }}>
                                        {row.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
                                        {row.duration}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ display: isSmallScreen ? 'none' : 'table-cell' }}>
                                    <Typography variant="body2" sx={{ color: '#666' }}>
                                        {row.date}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                    <Typography variant="body2" sx={{ color: '#666' }}>
                                        {isSmallScreen ? row.time.split(' ')[0] : row.time}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right" sx={{ 
                                    pr: 3,
                                    whiteSpace: 'nowrap',
                                    minWidth: '120px' // Ensure status chip always has space
                                }}>
                                    <Chip
                                        label={row.status}
                                        sx={{
                                            borderRadius: '16px',
                                            fontWeight: 500,
                                            fontSize: '13px',
                                            color: row.status === 'Completed' ? '#4ade80' : '#f97316',
                                            bgcolor: row.status === 'Completed' ? '#F0FDF4' : '#ffedd5',
                                            border: row.status === 'Completed' ? '1px solid #00E58F' : '1px solid #f97316',
                                            '& .MuiChip-label': { px: 2 }
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination controls */}
            <Box sx={{ 
                display: 'flex', 
                flexDirection: isSmallScreen ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                mt: 2
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        startIcon={<ArrowBackIosNewIcon sx={{ fontSize: '0.75rem' }} />}
                        onClick={() => handleChangePage(null, Math.max(1, page - 1))}
                        disabled={page === 1}
                        size="small"
                        sx={{
                            color: '#666',
                            textTransform: 'none',
                            minWidth: 'auto',
                            '&:hover': { bgcolor: 'transparent' },
                            '&.Mui-disabled': { color: '#ccc' }
                        }}
                    >
                        Back
                    </Button>

                    <Box sx={{ display: 'flex', mx: 1 }}>
                        {[1, 2, 3].map((number) => (
                            <Button
                                key={number}
                                onClick={() => handleChangePage(null, number)}
                                size="small"
                                sx={{
                                    minWidth: '32px',
                                    height: '32px',
                                    borderRadius: '4px',
                                    mx: 0.5,
                                    color: page === number ? 'white' : '#666',
                                    bgcolor: page === number ? '#20ACE2' : 'transparent',
                                    '&:hover': {
                                        bgcolor: page === number ? '#1C9BD1' : '#f5f5f5'
                                    }
                                }}
                            >
                                {number}
                            </Button>
                        ))}
                    </Box>

                    <Button
                        endIcon={<ArrowForwardIosIcon sx={{ fontSize: '0.75rem' }} />}
                        onClick={() => handleChangePage(null, Math.min(3, page + 1))}
                        disabled={page === 3}
                        size="small"
                        sx={{
                            color: '#666',
                            textTransform: 'none',
                            minWidth: 'auto',
                            '&:hover': { bgcolor: 'transparent' },
                            '&.Mui-disabled': { color: '#ccc' }
                        }}
                    >
                        Next
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ mr: 1, color: '#666' }}>
                        Rows per page:
                    </Typography>
                    <FormControl variant="outlined" size="small">
                        <Select
                            value={rowsPerPage}
                            onChange={handleChangeRowsPerPage}
                            sx={{
                                height: '32px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#ddd',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#bbb',
                                },
                            }}
                        >
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                            <MenuItem value={200}>200</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <Typography variant="body2" sx={{ 
                color: '#666', 
                mt: 1,
                textAlign: isSmallScreen ? 'center' : 'left'
            }}>
                {startItem}-{endItem} of {totalItems}
            </Typography>
        </Box>
    );
}