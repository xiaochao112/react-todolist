import { FC, HTMLAttributes, ReactNode } from 'react';

interface TProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
}

const MyIcon: FC<TProps> = ({ icon, className, ...argr }) => {
  return (
    <>
      <div
        {...argr}
        className={` btn_hover flex justify-center items-center cursor-pointer flex-shrink-0 ${className}`}
        style={{
          width: 28,
          height: 28,
        }}>
        {icon}
      </div>
    </>
  );
};

export default MyIcon;
