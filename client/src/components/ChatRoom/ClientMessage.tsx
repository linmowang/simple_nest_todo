import { FC } from "react";

interface Props {
  content: string;
  createdAt: number;
}

const ClientMessage: FC<Props> = (props) => {
  const { content, createdAt } = props;
  return (
    <div>
      <p style={{ display: "flex" }}>
        <span>我：</span>
        <span style={{ width: "200px", textAlign: "left" }}>{content}</span>
      </p>
    </div>
  );
};

export default ClientMessage;
