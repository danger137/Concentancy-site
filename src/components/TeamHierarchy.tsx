'use client';

import React from 'react';
import { Reveal } from './RevealAnimations';
import '../styles/hierarchy.css';

export default function TeamHierarchy() {
  const departments = [
    { name: 'HR Department', role: 'Human Resources' },
    { name: 'Financial Department', role: 'Finance' },
    { name: 'Marketing Department', role: 'Marketing' },
    { name: 'Admission Department', role: 'Admissions' }
  ];

  return (
    <div className="hierarchy-container">
      {/* CEO Level */}
      <div className="hierarchy-node level-0">
        <Reveal animation="fade-up">
          <div className="hierarchy-card">
            <h3 className="card-title">CEO</h3>
            <span className="card-role">Chief Executive Officer</span>
          </div>
        </Reveal>
        
        <div className="hierarchy-children">
          {/* Director Level */}
          <div className="hierarchy-node level-1">
            <Reveal animation="fade-up" delay={0.1}>
              <div className="hierarchy-card">
                <h3 className="card-title">Director</h3>
                <span className="card-role">Operations & Strategy</span>
              </div>
            </Reveal>

            <div className="hierarchy-children">
              {/* Departments Level */}
              {departments.map((dept, index) => (
                <div key={index} className="hierarchy-node level-2">
                  <Reveal animation="fade-up" delay={0.2 + (index * 0.1)}>
                    <div className="hierarchy-card">
                      <h3 className="card-title" style={{ fontSize: '1.1rem' }}>{dept.name}</h3>
                      <span className="card-role" style={{ fontSize: '0.8rem', color: '#6c757d' }}>{dept.role}</span>
                      
                      <div className="leaf-nodes mt-3">
                        <div className="leaf-node mb-2">
                          <h4 className="leaf-title">Manager</h4>
                          <span className="leaf-role">Department Head</span>
                        </div>
                        <div className="leaf-node">
                          <h4 className="leaf-title">Staff</h4>
                          <span className="leaf-role">Team Members</span>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
