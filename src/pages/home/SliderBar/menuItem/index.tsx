import { HTMLAttributes, ReactNode } from 'react';
import './index.less';
interface TPorps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  icon: ReactNode;
  checked: boolean;
}

function MenuItem({ text, icon, checked, ...args }: TPorps) {
  return (
    <>
      <div
        {...args}
        className='sliderBar_menuItem p-2 rounded-md cursor-pointer'
        style={{ backgroundColor: checked ? '#eee' : '' }}>
        {icon}
        <span className=' ml-2'>{text}</span>
      </div>
    </>
  );
}

export default MenuItem;
