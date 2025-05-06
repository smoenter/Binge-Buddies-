import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { motion, useAnimation } from 'framer-motion';
import './css/Transition.css';
import logo from '../assets/BB-logo-2.png';
import transitionSound from '../assets/intro-sound3.mp3';

const Transition = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { width, height } = useWindowSize();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const controls = useAnimation();

    // Check if coming from signup
    const fromSignup = location.state?.fromSignup || false;

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio(transitionSound);
        audioRef.current.volume = 0.5;

        // Play the sound when component mounts
        audioRef.current.play().catch(error => {
            console.error('Audio playback failed:', error);
        });

        // Smooth cinematic animation sequence
        const runAnimations = async () => {
            // Initial appearance (soft fade in) - 1.2s
            await controls.start({
                opacity: 1,
                scale: 0.8,
                filter: 'blur(8px)',
                transition: { duration: 1.2, ease: [0.2, 0, 0, 1] }
            });

            // First beat - quick focus - 0.3s (total 1.5s)
            await controls.start({
                scale: 0.9,
                filter: 'blur(4px)',
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            });

            // Second beat - dramatic expansion - 0.4s (total 1.9s)
            await controls.start({
                scale: 1.15,
                filter: 'blur(0px) drop-shadow(0 0 16px rgba(255, 255, 255, 0.8))',
                transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
            });

            // Third beat - subtle recoil - 0.6s (total 2.5s)
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

            // Final dramatic pulse - 0.8s (total 3.3s)
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

            // Maintain stable state briefly - 0.7s (total 4s)
            await controls.start({
                scale: 1,
                filter: 'drop-shadow(0 0 16px rgba(255, 255, 255, 0.8))',
                transition: { duration: 0.7 }
            });

            // Extended flickering effect - 4s (total 8s)
            await controls.start({
                filter: [
                    'drop-shadow(0 0 16px rgba(255, 255, 255, 0.8))',
                    'drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))',
                    'drop-shadow(0 0 20px rgba(255, 255, 255, 1))',
                    'drop-shadow(0 0 4px rgba(255, 255, 255, 0.2))',
                    'drop-shadow(0 0 24px rgba(255, 255, 255, 1.2))',
                    'drop-shadow(0 0 6px rgba(255, 255, 255, 0.3))',
                    'drop-shadow(0 0 18px rgba(255, 255, 255, 0.9))',
                    'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',
                    'drop-shadow(0 0 16px rgba(255, 255, 255, 0.8))'
                ],
                transition: {
                    duration: 4,
                    times: [0, 0.1, 0.25, 0.4, 0.55, 0.65, 0.8, 0.9, 1],
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'reverse'
                }
            });
        };

        runAnimations();

        // Navigate after 8 seconds total
        const timer = setTimeout(() => {
            navigate('/');
        }, 8000);

        return () => {
            clearTimeout(timer);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                audioRef.current = null;
            }
        };
    }, [navigate, controls]);

    return (
        <div className="transition-container">
            {fromSignup && <Confetti width={width} height={height} />}

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

            <audio
                src={transitionSound}
                preload="auto"
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default Transition;