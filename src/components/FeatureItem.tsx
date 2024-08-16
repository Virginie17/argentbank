import { FC } from 'react';
import '../styles/main.css'

interface FeatureItemProps {
    imgSrc: string;
    title: string;
    description: string;
}


const FeatureItem: FC<FeatureItemProps> = ({ imgSrc, title, description }) => (
  <div className="feature-item">
    <img src={imgSrc} alt="Feature Icon" className="feature-icon" />
    <h3 className="feature-item-title">{title}</h3>
    <p>{description}</p>
  </div>
);

export default FeatureItem;