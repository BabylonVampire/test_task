import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
	return (
		<section className="hero-section">
			<div className="hero-section__container">
				<div className="hero-section__cards-grid">
					<div className="card hero-section__card1"></div>
					<div className="card hero-section__card2"></div>
					<div className="card hero-section__card3"></div>
					<div className="card hero-section__card4"></div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
