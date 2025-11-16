import express from 'express';
import authRoutes from './auth.routes.js';

const router = express.Router();

/**
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Mount route modules
 */
router.use('/auth', authRoutes);

// TODO: Add more route modules as they are implemented
// router.use('/users', userRoutes);
// router.use('/groups', groupRoutes);
// router.use('/geo', geoRoutes);
// router.use('/needy', needyRoutes);
// router.use('/labor', laborRoutes);
// router.use('/unions', unionRoutes);
// router.use('/shop', shopRoutes);
// router.use('/media', mediaRoutes);
// router.use('/gallery', galleryRoutes);
// router.use('/franchise', franchiseRoutes);
// router.use('/cms', cmsRoutes);
// router.use('/chat', chatRoutes);
// router.use('/god', godRoutes);
// router.use('/myads', myadsRoutes);

export default router;

