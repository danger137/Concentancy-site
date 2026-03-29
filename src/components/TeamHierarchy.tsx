'use client';

import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { motion } from 'framer-motion';

const Node = ({ title, name, icon, color, isCEO = false }: { title: string; name: string; icon: string; color: string; isCEO?: boolean }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
            duration: 0.5, 
            type: "spring", 
            stiffness: 120, 
            damping: 15
        }}
        whileHover={{ 
            y: -8, 
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
            borderColor: color
        }}
        className={`d-inline-block bg-white rounded-5 shadow-sm border p-4 text-center transition-all cursor-default position-relative ${isCEO ? 'ceo-node' : ''}`}
        style={{ 
            minWidth: isCEO ? '240px' : '200px', 
            borderTop: `6px solid ${color}`, 
            zIndex: 10,
            background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
            backdropFilter: 'blur(10px)',
            borderLeft: '1px solid rgba(0,0,0,0.02)',
            borderRight: '1px solid rgba(0,0,0,0.02)',
            borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}
    >
        <div className="node-icon-wrapper rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 text-center" 
             style={{ 
                 width: isCEO ? '64px' : '54px', 
                 height: isCEO ? '64px' : '54px', 
                 backgroundColor: `${color}10`,
                 border: `2px solid ${color}20`,
                 position: 'relative',
                 zIndex: 999
             }}>
            <i className={`fa ${icon}`} style={{ color, fontSize: isCEO ? '32px' : '24px' }}></i>
        </div>
        <h6 className="fw-bold mb-2 text-dark" style={{ fontSize: isCEO ? '1.15rem' : '1rem', letterSpacing: '-0.3px' }}>{name}</h6>
        <div className="d-inline-flex align-items-center px-3 py-1 rounded-pill" style={{ backgroundColor: `${color}08`, border: `1px solid ${color}15` }}>
            <span style={{ 
                fontSize: '0.65rem', 
                textTransform: 'uppercase', 
                letterSpacing: '1.2px', 
                fontWeight: 900,
                color: color
            }}>{title}</span>
        </div>
    </motion.div>
);

const VerticalNode = ({ title, name, icon, color, isCEO = false, isDirector = false, staffCount = 0 }: { title: string; name: string; icon: string; color: string; isCEO?: boolean; isDirector?: boolean; staffCount?: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-4 shadow-sm border p-3 w-100 position-relative"
        style={{ borderLeft: `5px solid ${color}`, maxWidth: '340px' }}
    >
        <div className="d-flex align-items-center gap-3">
            <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" 
                 style={{ 
                     width: isCEO ? '50px' : '40px', 
                     height: isCEO ? '50px' : '40px', 
                     backgroundColor: `${color}10`,
                     border: `1px solid ${color}20`,
                     position: 'relative',
                     zIndex: 999 
                 }}>
                <i className={`fa ${icon}`} style={{ color, fontSize: isCEO ? '26px' : '20px' }}></i>
            </div>
            <div className="flex-grow-1">
                <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: isCEO ? '1.05rem' : '0.9rem' }}>{name}</h6>
                <p className="mb-0 text-muted" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>{title}</p>
            </div>
            {staffCount > 0 && (
                <div className="bg-light px-2 py-1 rounded-pill border small">
                    <span className="fw-bold" style={{ fontSize: '0.7rem', color: '#666' }}>{staffCount} Staff</span>
                </div>
            )}
        </div>
    </motion.div>
);

const Line = () => <div className="vertical-connector-line mx-auto" style={{ width: '2px', height: '25px', backgroundColor: '#cbd5e0' }}></div>;

const TeamHierarchy = () => {
    const departments = [
        { name: 'HR Dept', manager: 'Manager HR', color: '#FF7700' },
        { name: 'Financial Dept', manager: 'Manager Finance', color: '#28a745' },
        { name: 'Marketing Dept', manager: 'Manager Marketing', color: '#007bff' },
        { name: 'Admission Dept', manager: 'Manager Admission', color: '#6610f2' },
        { name: 'Admin Dept', manager: 'Admin Manager', color: '#1E5082' },
    ];

    return (
        <section className="py-5 bg-light border-top team-hierarchy-section">
            <div className="container-xl overflow-auto pb-5 custom-scrollbar">
                <div className="text-center mb-5">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h4 className="col_oran fw-bold text-uppercase ls-2 mb-2" style={{ fontSize: '0.9rem' }}>Our Team Structure</h4>
                        <h2 className="display-4 fw-bold text-dark">Organizational Hierarchy</h2>
                        <div className="mx-auto mt-4 mb-2" style={{ width: '80px', height: '5px', borderRadius: '10px', background: 'linear-gradient(to right, #FF7700, #07294D)' }}></div>
                    </motion.div>
                </div>

                <div className="org-tree-container d-none d-xl-block px-4" style={{ minWidth: '1300px' }}>
                    <Tree
                        lineWidth={'2px'}
                        lineColor={'#cbd5e0'}
                        lineBorderRadius={'20px'}
                        label={<Node title="Chief Executive Officer" name="Khurram Hashmi" icon="fa-user" color="#07294D" isCEO={true} />}
                    >
                        <TreeNode label={<Node title="Director" name="Director Operations" icon="fa-briefcase" color="#1E5082" />}>
                            {departments.map((dept, index) => (
                                <TreeNode key={index} label={<Node title={dept.name} name={dept.manager} icon="fa-users" color={dept.color} />}>
                                    <TreeNode label={
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="d-flex flex-wrap justify-content-center gap-2 mt-3"
                                        >
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <div key={s} className="bg-white px-3 py-1 rounded-pill border small shadow-sm text-muted staff-node transition" style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                                                    <i className="fa fa-user-o me-1" style={{ fontSize: '0.65rem' }}></i> Staff {s}
                                                </div>
                                            ))}
                                        </motion.div>
                                    } />
                                </TreeNode>
                            ))}
                        </TreeNode>
                    </Tree>
                </div>

                {/* Mobile & Tablet View: Vertical Stack (Fixes overflow issue) */}
                <div className="mobile-hierarchy d-xl-none px-3">
                    <div className="d-flex flex-column align-items-center">
                        <VerticalNode title="Chief Executive Officer" name="Khurram Hashmi" icon="fa-user" color="#07294D" isCEO={true} />
                        <Line />
                        <VerticalNode title="Director" name="Director Operations" icon="fa-briefcase" color="#1E5082" isDirector={true} />
                        <Line />
                        
                        <div className="w-100 d-flex flex-column gap-3">
                            <h5 className="text-center fw-bold mt-2 mb-3 small text-muted text-uppercase ls-1">Departments</h5>
                            {departments.map((dept, index) => (
                                <div key={index} className="w-100 d-flex flex-column align-items-center">
                                    <VerticalNode title={dept.name} name={dept.manager} icon="fa-users" color={dept.color} staffCount={5} />
                                    {index < departments.length - 1 && <Line />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{
                __html: `
                .team-hierarchy-section {
                    position: relative;
                    background-image: radial-gradient(#dee2e6 1px, transparent 1px);
                    background-size: 30px 30px;
                    background-color: #f8f9fa !important;
                    overflow: hidden;
                }
                
                .org-tree-container {
                    padding: 2rem 0;
                    margin: 0 auto;
                }

                .org-tree-container ul {
                    padding-top: 40px !important;
                }
                
                /* Completely disable rigid CSS borders to use flowing backgrounds */
                .org-tree-container li::before, 
                .org-tree-container li::after,
                .org-tree-container ul::before {
                    border: none !important;
                }

                /* 1) Vertical drop from Parent */
                .org-tree-container ul::before {
                    width: 2px !important;
                    height: 40px !important;
                    left: 50% !important;
                    transform: translateX(-50%);
                    background-image: linear-gradient(180deg, #e2e8f0 30%, #FF7700 50%, #e2e8f0 70%) !important;
                    background-size: 100% 200% !important;
                    background-repeat: no-repeat !important;
                    animation: flowVert 1s infinite linear !important;
                }

                /* 2) Middle and First Children: Right-flowing top + Left drop down */
                .org-tree-container li::after {
                    background-image: 
                        linear-gradient(90deg, #e2e8f0 30%, #FF7700 50%, #e2e8f0 70%), 
                        linear-gradient(180deg, #e2e8f0 30%, #FF7700 50%, #e2e8f0 70%) !important;
                    background-size: 200% 2px, 2px 200% !important;
                    background-position: 0% 0%, 0% 0% !important;
                    background-repeat: no-repeat !important;
                    animation: flowRightAndDown 1.5s infinite linear !important;
                    height: 20px !important;
                }

                /* 3) Middle and Last Children: Left-flowing top (No drop down here) */
                .org-tree-container li::before {
                    background-image: linear-gradient(270deg, #e2e8f0 30%, #FF7700 50%, #e2e8f0 70%) !important;
                    background-size: 200% 2px !important;
                    background-position: 100% 0% !important;
                    background-repeat: no-repeat !important;
                    animation: flowLeft 1.5s infinite linear !important;
                    height: 20px !important;
                }

                /* 4) Last Child Special Case: Left-flowing top + Right drop down */
                .org-tree-container li:last-child::before {
                    background-image: 
                        linear-gradient(270deg, #e2e8f0 30%, #FF7700 50%, #e2e8f0 70%),
                        linear-gradient(180deg, #e2e8f0 30%, #FF7700 50%, #e2e8f0 70%) !important;
                    background-size: 200% 2px, 2px 200% !important;
                    background-position: 100% 0%, 100% 0% !important;
                    background-repeat: no-repeat !important;
                    animation: flowLeftAndDown 1.5s infinite linear !important;
                }

                /* Erase overflowing extensions on ends */
                .org-tree-container li:first-child::before,
                .org-tree-container li:last-child::after {
                    background-image: none !important;
                }

                /* Flow Animations */
                @keyframes flowVert {
                    0%   { background-position: 0% 150%; }
                    100% { background-position: 0% -50%; }
                }
                @keyframes flowRightAndDown {
                    0%   { background-position: 150% 0%, 0% 150%; }
                    100% { background-position: -50% 0%, 0% -50%; }
                }
                @keyframes flowLeftAndDown {
                    0%   { background-position: -50% 0%, 100% 150%; }
                    100% { background-position: 150% 0%, 100% -50%; }
                }
                @keyframes flowLeft {
                    0%   { background-position: -50% 0%; }
                    100% { background-position: 150% 0%; }
                }

                /* Mobile Vertical connector */
                .vertical-connector-line {
                    height: 35px !important;
                    width: 4px !important;
                    border-radius: 10px;
                    background-color: #e2e8f0 !important;
                    background-image: linear-gradient(180deg, transparent 0%, rgba(255, 119, 0, 0.1) 20%, #FF7700 50%, rgba(255, 119, 0, 0.1) 80%, transparent 100%) !important;
                    background-size: 100% 200% !important;
                    background-position: 0% 100% !important;
                    animation: lineFlowVertical 1.5s infinite linear !important;
                    box-shadow: 0 0 4px rgba(255,119,0,0.2);
                }

                @keyframes lineFlowVertical {
                    0% { background-position: 0% -200%; }
                    100% { background-position: 0% 200%; }
                }

                .ceo-node {
                    box-shadow: 0 10px 30px -5px rgba(7, 41, 77, 0.2) !important;
                }

                .staff-node {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 1px solid #edf2f7 !important;
                    white-space: nowrap;
                }

                .staff-node:hover {
                    border-color: #FF7700 !important;
                    background-color: #fffaf0 !important;
                    color: #FF7700 !important;
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 4px 12px rgba(255, 119, 0, 0.15) !important;
                }

                .custom-scrollbar::-webkit-scrollbar {
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #FF7700;
                }
                
                @media (max-width: 1400px) {
                    .org-tree-container {
                        transform: scale(0.9);
                        transform-origin: top center;
                    }
                }

                @media (max-width: 1200px) {
                    .org-tree-container {
                        transform: scale(0.8);
                    }
                }

                @media (max-width: 991px) {
                    .org-tree-container {
                        transform: scale(0.7);
                        margin-bottom: -150px;
                    }
                }

                @media (max-width: 1199px) {
                    .org-tree-container {
                        display: none !important;
                    }
                    .team-hierarchy-section {
                        padding-bottom: 2rem !important;
                    }
                }

                @media (max-width: 576px) {
                    .team-hierarchy-section h2 {
                        font-size: 1.75rem !important;
                    }
                    .team-hierarchy-section h4 {
                        font-size: 0.8rem !important;
                    }
                }
                `
            }} />
        </section>
    );
};

export default TeamHierarchy;
