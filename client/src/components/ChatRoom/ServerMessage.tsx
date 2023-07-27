import { FC } from "react";

interface Props {
  content: string;
  createdAt: number;
}

const ServerMessage: FC<Props> = (props) => {
  const { content, createdAt } = props;
  return (
    <div>
      <p style={{ display: "flex", justifyContent: "flex-end" }}>
        <span>{content}</span>
        <span>: 客服</span>
      </p>
    </div>
  );
};

export default ServerMessage;
