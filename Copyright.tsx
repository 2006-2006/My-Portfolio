import React, { useState, useEffect } from 'react';
import { Heart, Code } from 'lucide-react';

const Copyright: React.FC = () => {
    const [heartBeat, setHeartBeat] = useState(false);

    useEffect(() => {
        const heartInterval = setInterval(() => {
            setHeartBeat(true);
            setTimeout(() => setHeartBeat(false), 300);
        }, 2000);

        return () => clearInterval(heartInterval);
    }, []);

    return (
        <div className="bg-slate-900 border-t border-slate-800 py-8 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center z-10 relative">
                <p className="text-gray-400 text-lg font-semibold flex items-center justify-center gap-2 flex-wrap">
                    <Code className="w-5 h-5 text-cyan-400" />
                    <span>Developed and maintained by</span>
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-bold">
                        Yogeshwaran V
                    </span>
                    <Heart
                        className={`w-5 h-5 text-red-400 transition-all duration-300 ${heartBeat ? 'scale-125' : ''}`}
                    />
                </p>
            </div>
        </div>
    );
};

export default Copyright;
