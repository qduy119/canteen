import { Box, Grid, Skeleton } from "@mui/material";

export default function Skeletons({ width, height, nums }) {
    return (
        <Grid
            container
            wrap="wrap"
            justifyContent="start"
            alignItems="center"
            columnGap={1}
            rowGap={3}
        >
            {Array.from({ length: nums }, (_, index) => index).map((index) => (
                <Box key={index} sx={{ width: width }}>
                    <Skeleton
                        variant="rectangular"
                        width={width}
                        height={height}
                    />
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton />
                        <Skeleton width="60%" />
                        <Skeleton width="80%" />
                    </Box>
                </Box>
            ))}
        </Grid>
    );
}
