import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <Box sx={{ width: "220px", height: "100%", padding: "20px" }}>
            <Box component="ul" sx={{ listStyleType: "none", padding: 0 }}>
                <li>
                    <Link component={RouterLink} to="/" sx={{ display: "block", textDecoration: "none", color: "#000", marginBottom: "10px" }}>
                        Settings
                    </Link>
                </li>
                <li>
                    <Link component={RouterLink} to="/" sx={{ display: "block", textDecoration: "none", color: "#000", marginBottom: "10px" }}>
                        Team
                    </Link>
                </li>
                <Typography variant="body1" sx={{ color: "#c2c2c2" }} gutterBottom>menu</Typography>
                <li>
                    <Link component={RouterLink} to="/" sx={{ display: "block", textDecoration: "none", color: "#000", marginBottom: "10px" }}>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link component={RouterLink} to="/" sx={{ display: "block", textDecoration: "none", color: "#000", marginBottom: "10px" }}>
                        Campaigns
                    </Link>
                </li>
                <li>
                    <Link component={RouterLink} to="/" sx={{ display: "block", textDecoration: "none", color: "#000", marginBottom: "10px" }}>
                        Flow
                    </Link>
                </li>
                <li>
                    <Link component={RouterLink} to="/" sx={{ display: "block", textDecoration: "none", color: "#000", marginBottom: "10px" }}>
                        Integrations
                    </Link>
                </li>
                <li>
                    <Link component={RouterLink} to="/" sx={{ display: "block", textDecoration: "none", color: "#000", marginBottom: "10px" }}>
                        Customers
                    </Link>
                </li>
            </Box>
        </Box>
    );
};

export default Sidebar;
