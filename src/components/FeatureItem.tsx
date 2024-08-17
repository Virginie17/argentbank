
import '../styles/main.css'
import type { FeatureItemprops } from '../type';




const FeatureItem: React.FC<FeatureItemprops> = ({ imgSrc, title, description }) => (
  <div className="feature-item">
    <img src={imgSrc} alt="Feature Icon" className="feature-icon" />
    <h3 className="feature-item-title">{title}</h3>
    <p>{description}</p>
  </div>
);

export default FeatureItem;
