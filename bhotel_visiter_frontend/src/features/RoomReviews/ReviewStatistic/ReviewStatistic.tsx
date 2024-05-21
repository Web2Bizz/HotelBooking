import "./style.scss";
import { Progress, Rate } from "antd";

type Rating = {
  stars: number;
  count: number;
};

type ReviewStatisticProps = {
  ratings: Rating[];
  maxCount?: number;
};

const ReviewStatistic: React.FC<ReviewStatisticProps> = ({
  ratings,
  maxCount,
}) => {
  const max = maxCount || Math.max(...ratings.map((r) => r.count));
  return (
    <div className="ReviewStatistic-container">
      <div className="ReviewStatistic-statistic">
        <div>
          <Rate disabled={true} />
          <span> 4.8/5</span>
        </div>
        <p>12 отзывов</p>
      </div>
      {ratings.map((rating) => (
        <div key={rating.stars} className="ReviewStatistic-rating-row">
          <span>{`${rating.stars} звезд${rating.stars > 1 ? "ы" : "а"} `}</span>
          <div className="ReviewStatistic-rating-row-rate">
            <Progress
              percent={(rating.count / max) * 100}
              showInfo={false}
              style={{ width: "330px" }}
            />
            <span>{rating.count}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewStatistic;
