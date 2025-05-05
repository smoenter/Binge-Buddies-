import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { motion, useAnimation } from 'framer-motion';
import './css/Transition.css';
import logo from '../assets/BB-logo-2.png';
import transitionSound from '../assets/intro-sound3.mp3';

const Transition = () => {
    const navigate = useNavigate();
    const { width, height } = useWindowSize();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const controls = useAnimation();

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio(transitionSound);
        audioRef.current.volume = 0.5; // Set volume (0.0 to 1.0)

        // Play the sound when component mounts
        audioRef.current.play().catch(error => {
            console.error('Audio playback failed:', error);
        });

        // Smooth cinematic animation sequence
        const runAnimations = async () => {
            // Initial appearance (soft fade in)
            await controls.start({
                opacity: 1,
                scale: 0.8,
                filter: 'blur(8px)',
                transition: { duration: 1.2, ease: [0.2, 0, 0, 1] }
            });

            // First beat - quick focus
            await controls.start({
                scale: 0.9,
                filter: 'blur(4px)',
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            });

            // Second beat - dramatic expansion
            await controls.start({
                scale: 1.15,
                filter: 'blur(0px) drop-shadow(0 0 16px rgba(255, 255, 255, 0.8))',
                transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
            });

            // Third beat - subtle recoil
            await controls.start({
                scale: 1,
                transition: { 
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                    type: 'spring',
                    damping: 10,
                    stiffness: 100
                }
            });

            // Final dramatic pulse (sync with audio climax)
            await controls.start({
                scale: [1, 1.2, 1],
                filter: [
                    'drop-shadow(0 0 16px rgba(255, 255, 255, 0.8))',
                    'drop-shadow(0 0 32px rgba(255, 255, 255, 1))',
                    'drop-shadow(0 0 16px rgba(255, 255, 255, 0.8))'
                ],
                transition: { 
                    duration: 0.8,
                    times: [0, 0.5, 1],
                    ease: 'easeInOut'
                }
            });

            // Maintain final state
            await controls.start({
                scale: 1,
                filter: 'drop-shadow(0 0 16px rgba(255, 255, 255, 0.8))'
            });
        };

        runAnimations();

        // Simple timeout without the ref check
        const timer = setTimeout(() => {
            navigate('/');
        }, 8000);

        // Cleanup function
        return () => {
            clearTimeout(timer);
            // Stop and clean up audio when component unmounts
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                audioRef.current = null;
            }
        };
    }, [navigate, controls]);

    return (
        <div className="transition-container">
            <Confetti width={width} height={height} />
            <motion.div
                initial={{ opacity: 0, scale: 0.6, filter: 'blur(12px)' }}
                animate={controls}
                style={{
                    originX: 0.5,
                    originY: 0.5,
                }}
            >
                <img
                    className="transition-logo"
                    src={logo}
                    alt="Logo"
                    style={{ width: '100%', maxWidth: '400px', willChange: 'transform, filter' }}
                />
            </motion.div>

            {/* Hidden audio element for browsers that require interaction */}
            <audio
                src={transitionSound}
                preload="auto"
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default Transition;