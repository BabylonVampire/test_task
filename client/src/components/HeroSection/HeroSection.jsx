import React, { useEffect, useState } from 'react';
import { FaUniversity, FaUser } from 'react-icons/fa';
import { useUsers, useUniversities } from '../../hooks/';
import './HeroSection.css';
import PieDiagram from './PieDiagram/PieDiagram';

/**
 * Компонент главной секции.
 * @returns {JSX.Element} - компонент главной секции.
 */
const HeroSection = () => {
	const { pagination } = useUsers({});
	const { universities } = useUniversities();

	const [userCount, setUserCount] = useState(0);
	const [universityCount, setUniversityCount] = useState(0);
	useEffect(() => {
		if (universityCount < universities.length) {
			setTimeout(() => {
				setUniversityCount((prev) => prev + 1);
			}, (2 / universities.length) * 1000 || 0);
		}
	}, [universityCount, universities.length]);

	useEffect(() => {
		if (userCount < pagination.totalCount) {
			setTimeout(() => {
				setUserCount((prev) => prev + 1);
			}, (2 / pagination.totalCount) * 1000 || 0);
		}
	}, [userCount, JSON.stringify(pagination)]);
	return (
		<section className="hero-section" id="home-page">
			<div className="hero-section__container">
				<div className="hero-section__cards-grid">
					<div className="card hero-section__card1">
						<div className="card__big-title">
							ВУЗ
							<br />
							СТАТ
						</div>
					</div>
					<div className="card hero-section__card2">
						<PieDiagram
							parts={[
								{
									field: universities?.[0]?.name,
									color: '#d7bd66',
									size: universities?.[0]?.usersCount,
								},
								{
									field: universities?.[1]?.name,
									color: '#3bacb6',
									size: universities?.[1]?.usersCount,
								},
								{
									field: universities?.[2]?.name,
									color: '#66d766',
									size: universities?.[2]?.usersCount,
								},
							]}
							totalCount={universities.reduce(
								(sum, university) =>
									sum + university.usersCount,
								0
							)}
						/>
					</div>
					<div className="card hero-section__card3">
						<FaUser />
						<div className="card__description">{userCount}</div>
					</div>
					<div className="card hero-section__card4">
						<FaUniversity />
						<div className="card__description">
							{universityCount}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
