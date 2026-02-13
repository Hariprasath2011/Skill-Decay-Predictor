import { useState } from 'react';
import { Link } from 'react-router-dom';

const HexagonPillar = ({ user, rank, name, score, initials, color3, color, height }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Color Utility for generating 3D shading
    const adjustColor = (hex, amount) => {
        let usePound = false;
        if (hex[0] === "#") {
            hex = hex.slice(1);
            usePound = true;
        }
        let num = parseInt(hex, 16);
        let r = (num >> 16) + amount;
        if (r > 255) r = 255; else if (r < 0) r = 0;
        let b = ((num >> 8) & 0x00FF) + amount;
        if (b > 255) b = 255; else if (b < 0) b = 0;
        let g = (num & 0x0000FF) + amount;
        if (g > 255) g = 255; else if (g < 0) g = 0;
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
    };

    return (
        <div
            className="pillar-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '125px',
                height: '100%',
                position: 'relative',
                cursor: 'pointer'
            }}
        >
            {/* SPINNING HEXAGON HEAD */}
            <div style={{
                height: '144px',
                width: '125px',
                marginBottom: '-35px', // Overlap with the pillar body
                position: 'relative',
                zIndex: 50,
                perspective: '1000px'
            }}>
                <div style={{
                    position: 'relative',
                    height: '100%',
                    width: '100%',
                    transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy transition
                    transformStyle: 'preserve-3d',
                    transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}>
                    {/* FRONT FACE - Hexagon SVG */}
                    <div className="backface-hidden" style={{
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden'
                    }}>
                        {rank === 2 && (
                            <svg width="100%" height="100%" viewBox="0 0 128 144" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M65.0031 0L95.9646 17.7522L127 36L127 71.9744V108L95.9646 126.248L65.0031 144L33.5 126L2 108L2 72L2 36L33.3215 17.7522L65.0031 0Z" fill="#8697A7"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M65 144L33.5 126L2 108L2 64L33 38L64 66L95 49L88 61L95 96L65 144Z" fill="#545D62"></path>
                                <path d="M33.0006 36.0034L35.0006 36.0035L64 52L93.0006 36.0037L95.0006 36.0039L95 38L64 55L33.0006 38L33.0006 36.0034Z" fill="#DCFCFF"></path>
                                <path d="M33 49.0023V38L64 55.0023V66.0023L33 49.0023Z" fill="#668A95"></path>
                                <path d="M95 49.0023V38L64 55.0023V66.0023L95 49.0023Z" fill="#E5FDFF"></path>
                                <path d="M95 38L64 66L95 49V38Z" fill="#BBDEE2"></path>
                                <path d="M33 38L64 66L33 49V38Z" fill="#4E7072"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M36 58.0019L64 77.0136L92 58.0019L95 58V94.0136L64 112.014L33 94.0136L33 58L36 58.0019Z" fill="#DCFCFF"></path>
                                <path d="M64 79L33 58L33 96L64 114L64 79Z" fill="#668A95"></path>
                                <path d="M64 79L95 58V96L64 114L64 79Z" fill="#E5FDFF"></path>
                                <path d="M64 114L33 58L33 96L64 114Z" fill="#4E7072"></path>
                                <path d="M64 114L95 58V96L64 114Z" fill="#BBDEE2"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M65 9L37.291 24.6983L10.0004 41L10.0004 103.507L37.2911 119.302L64.9961 134.996L91.9471 119.33L119 104.01L119 40.5765L91.9471 24.6705L65 9ZM95.9646 17.7522L65.0031 0L33.3215 17.7522L2 36L2 108L18 117L33.5 126L65.0031 144L95.9646 126.248L127 108L127 36L95.9646 17.7522Z" fill="#758481"></path>
                                <path d="M68.002 10.7526L70.9996 3.44141L119.164 31.3945L113 37.0156L68.002 10.7526Z" fill="#E9FEFF"></path>
                                <path d="M65 144V135L10 103.5L10 41L2 36L2 108L65 144Z" fill="#3B4144"></path>
                            </svg>
                        )}
                        {rank === 1 && (
                            <svg width="100%" height="100%" viewBox="0 0 125 144" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M63.0031 0L93.9646 17.7522L125 36L125 71.9744V108L93.9646 126.248L63.0031 144L31.5 126L0 108L0 72L0 36L31.3215 17.7522L63.0031 0Z" fill="#C49A44"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M63 144L31.5 126L0 108L0 64L31 38L62 66L93 49L86 61L93 96L63 144Z" fill="#8F5C2F"></path>
                                <path d="M31.0006 36.0034L33.0006 36.0035L62 52L91.0006 36.0037L93.0006 36.0039L93 38L62 55L31.0006 38L31.0006 36.0034Z" fill="#FDF7C3"></path>
                                <path d="M31 49.0023V38L62 55.0023V66.0023L31 49.0023Z" fill="#DA9A42"></path>
                                <path d="M93 49.0023V38L62 55.0023V66.0023L93 49.0023Z" fill="#FDF0CD"></path>
                                <path d="M93 38L62 66L93 49V38Z" fill="#E5C767"></path>
                                <path d="M31 38L62 66L31 49V38Z" fill="#AC7848"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M34 58.0019L62 77.0136L90 58.0019L93 58V94.0136L62 112.014L31 94.0136L31 58L34 58.0019Z" fill="#FDF7C3"></path>
                                <path d="M62 79L31 58L31 96L62 114L62 79Z" fill="#DA9A42"></path>
                                <path d="M62 79L93 58V96L62 114L62 79Z" fill="#FDF0CD"></path>
                                <path d="M62 114L31 58L31 96L62 114Z" fill="#AC7848"></path>
                                <path d="M62 114L93 58V96L62 114Z" fill="#E5C767"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M63 9L35.291 24.6983L8.0004 41L8.0004 103.507L35.2911 119.302L62.9961 134.996L89.9471 119.33L117 104.01L117 40.5765L89.9471 24.6705L63 9ZM93.9646 17.7522L63.0031 0L31.3215 17.7522L0 36L0 108L16 117L31.5 126L63.0031 144L93.9646 126.248L125 108L125 36L93.9646 17.7522Z" fill="#AD8557"></path>
                                <path d="M66.002 10.7526L68.9996 3.44141L117.164 31.3945L111 37.0156L66.002 10.7526Z" fill="#FDF7C3"></path>
                                <path d="M63 144V135L8 103.5L8 41L0 36L0 108L63 144Z" fill="#65401D"></path>
                            </svg>
                        )}
                        {rank === 3 && (
                            <svg width="100%" height="100%" viewBox="0 0 125 144" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M63.0031 0L93.9646 17.7522L125 36L125 71.9744V108L93.9646 126.248L63.0031 144L31.5 126L0 108L0 72L0 36L31.3215 17.7522L63.0031 0Z" fill="#AB765E"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M63 144L31.5 126L0 108L0 64L31 38L62 66L93 49L86 61L93 96L63 144Z" fill="#6B453A"></path>
                                <path d="M31.0006 36.0034L33.0006 36.0035L62 52L91.0006 36.0037L93.0006 36.0039L93 38L62 55L31.0006 38L31.0006 36.0034Z" fill="#F8E2D4"></path>
                                <path d="M31 49.0023V38L62 55.0023V66.0023L31 49.0023Z" fill="#B97256"></path>
                                <path d="M93 49.0023V38L62 55.0023V66.0023L93 49.0023Z" fill="#FED3C3"></path>
                                <path d="M93 38L62 66L93 49V38Z" fill="#DBA382"></path>
                                <path d="M31 38L62 66L31 49V38Z" fill="#895150"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M34 58.0019L62 77.0136L90 58.0019L93 58V94.0136L62 112.014L31 94.0136L31 58L34 58.0019Z" fill="#F8E2D4"></path>
                                <path d="M62 79L31 58L31 96L62 114L62 79Z" fill="#B97256"></path>
                                <path d="M62 79L93 58V96L62 114L62 79Z" fill="#FED3C3"></path>
                                <path d="M62 114L31 58L31 96L62 114Z" fill="#895150"></path>
                                <path d="M62 114L93 58V96L62 114Z" fill="#DBA382"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M63 9L35.291 24.6983L8.0004 41L8.0004 103.507L35.2911 119.302L62.9961 134.996L89.9471 119.33L117 104.01L117 40.5765L89.9471 24.6705L63 9ZM93.9646 17.7522L63.0031 0L31.3215 17.7522L0 36L0 108L16 117L31.5 126L63.0031 144L93.9646 126.248L125 108L125 36L93.9646 17.7522Z" fill="#F2B483"></path>
                                <path d="M66.002 10.7526L68.9996 3.44141L117.164 31.3945L111 37.0156L66.002 10.7526Z" fill="#F8E2D4"></path>
                                <path d="M63 144V135L8 103.5L8 41L0 36L0 108L63 144Z" fill="#AA6D44"></path>
                            </svg>
                        )}
                    </div>

                    {/* BACK FACE - INFO */}
                    <div className="backface-hidden" style={{
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        overflow: 'hidden',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                        {/* ABSOLUTE BACKGROUND SVG */}
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                            {rank === 2 && (
                                <svg width="100%" height="100%" viewBox="0 0 125 144" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M63.0031 0L93.9646 17.7522L125 36L125 71.9744V108L93.9646 126.248L63.0031 144L31.5 126L0 108L0 72L0 36L31.3215 17.7522L63.0031 0Z" fill="#8697A7"></path>
                                    <path d="M8 91L44 55L77 65L59 134L7.5 106L8 91Z" fill="#545D62"></path>
                                    <circle cx="62" cy="55" r="18" fill="#545D62"></circle>
                                    <circle cx="62" cy="55" r="16" stroke="#E5FDFF" strokeWidth="4"></circle>
                                </svg>
                            )}
                            {rank === 1 && (
                                <svg width="100%" height="100%" viewBox="0 0 125 144" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M63.0031 0L93.9646 17.7522L125 36L125 71.9744V108L93.9646 126.248L63.0031 144L31.5 126L0 108L0 72L0 36L31.3215 17.7522L63.0031 0Z" fill="#C49A44"></path>
                                    <path d="M8 91L44 55L77 65L59 134L7.5 106L8 91Z" fill="#8F5C2F"></path>
                                    <circle cx="62" cy="55" r="18" fill="#8F5C2F"></circle>
                                    <circle cx="62" cy="55" r="16" stroke="#FDF0CD" strokeWidth="4"></circle>
                                </svg>
                            )}
                            {rank === 3 && (
                                <svg width="100%" height="100%" viewBox="0 0 125 144" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M63.0031 0L93.9646 17.7522L125 36L125 71.9744V108L93.9646 126.248L63.0031 144L31.5 126L0 108L0 72L0 36L31.3215 17.7522L63.0031 0Z" fill="#AB765E"></path>
                                    <path d="M8 91L44 55L77 65L59 134L7.5 106L8 91Z" fill="#6B453A"></path>
                                    <circle cx="62" cy="55" r="18" fill="#92573D"></circle>
                                    <circle cx="62" cy="55" r="16" stroke="#F2B483" strokeWidth="4"></circle>
                                </svg>
                            )}
                        </div>

                        {/* CONTENT - Flex Items */}
                        <div style={{
                            marginTop: '40px', // Exact align with SVG circle centered at y=55 (55 - 15 = 40)
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: color3 || '#555',
                            color: 'white',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            zIndex: 10,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                            flexShrink: 0
                        }}>
                            {initials}
                        </div>

                        <div style={{
                            marginTop: '8px', // Spacing between avatar and name
                            width: '100%',
                            textAlign: 'center',
                            zIndex: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <h3 style={{
                                fontSize: '11px',
                                color: 'white',
                                margin: '0 0 2px 0',
                                maxWidth: '90%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                padding: '0 4px',
                                fontWeight: 'bold',
                                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                            }}>
                                {name}
                            </h3>
                            <p style={{
                                fontSize: '10px',
                                color: 'rgba(255,255,255,0.9)',
                                margin: 0,
                                fontWeight: '600'
                            }}>
                                {score}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SOLID CSS PILLAR BODY - Bottom Part (Rectangular) */}
            <div className="pillar-3d" style={{
                height: height,
                width: '100%', /* Full width relative to container */
                position: 'relative',
                opacity: 0.9
            }}>
                {/* Rectangular Top Cap (fake 3D perspective) */}
                <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '0',
                    width: '100%',
                    height: '15px',
                    backgroundColor: adjustColor(color, 20),
                    transform: 'skewX(0deg)', /* Flat top for rectangle */
                    clipPath: 'polygon(0 100%, 10% 0, 90% 0, 100% 100%)' /* Slight trapezoid for perspective */
                }}></div>

                {/* Main Rectangular Body */}
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(to right, ${adjustColor(color, -40)}, ${adjustColor(color, 0)} 50%, ${adjustColor(color, -40)})`,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}></div>

                {/* Rank Number on the Pillar */}
                <div className="rank-number" style={{
                    color: 'rgba(255,255,255,0.95)',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    width: '100%',
                    textAlign: 'center',
                    top: '30px',
                    zIndex: 10,
                    position: 'absolute'
                }}>{rank}</div>

                {/* Decorative Chevrons/Arrows */}
                <div style={{ position: 'absolute', bottom: '30px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.3, zIndex: 10 }}>
                    <div style={{ width: '40%', height: '20px', borderBottom: '5px solid white', transform: 'rotate(0deg)', marginBottom: '8px' }}></div>
                    <div style={{ width: '40%', height: '20px', borderBottom: '5px solid white', transform: 'rotate(0deg)' }}></div>
                </div>
            </div>
        </div>
    );
};

export default HexagonPillar;
