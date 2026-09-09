import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { ROUTES } from '../constants';

export default function NotFoundPage() {
    return (
        <Box
            component="main"
            sx={{
                minHeight: '100vh',
                display: 'grid',
                placeItems: 'center',
                bgcolor: 'common.white',
                px: 3,
                py: {
                    xs: 12,
                    sm: 16,
                },
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    textAlign: 'center',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.04,
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                >
                    <Box
                        component="svg"
                        viewBox="0 0 400 200"
                        sx={{
                            width: '100%',
                            maxWidth: 600,
                            fontWeight: 'bold',
                        }}
                    >
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="currentColor"
                            fontSize="180"
                        >
                            404
                        </text>
                    </Box>
                </Box>

                {/* Foreground content */}
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'primary.main',
                            fontWeight: 600,
                        }}
                    >
                        404 Error
                    </Typography>

                    <Typography
                        component="h1"
                        sx={{
                            mt: 2,
                            fontSize: {
                                xs: '2rem',
                                sm: '3rem',
                            },
                            lineHeight: 1.2,
                            fontWeight: 700,
                            letterSpacing: '-0.025em',
                            background:
                                'linear-gradient(to right, #212121, #757575)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Page not found
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            mt: 3,
                            maxWidth: 450,
                            mx: 'auto',
                            color: 'text.secondary',
                            lineHeight: 1.75,
                        }}
                    >
                        Sorry, we could not find the page you are looking for.
                        It might have been moved, deleted, or never existed in
                        the first place.
                    </Typography>

                    <Box
                        sx={{
                            mt: 5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 3,
                        }}
                    >
                        <Button
                            component={Link}
                            to={ROUTES.HOME}
                            variant="contained"
                            sx={{
                                borderRadius: 999,
                                px: 3,
                                py: 1.25,
                                textTransform: 'none',
                                fontWeight: 600,
                                boxShadow: 1,
                                color: 'common.white',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    boxShadow: 3,
                                },
                            }}
                        >
                            Go back home
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
