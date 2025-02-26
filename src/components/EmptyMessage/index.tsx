import React from "react";

type Props = {
  message: string;
};

export default function EmptyMessage({ message }: Props) {
  return <p className="text-md">{message}</p>;
}
