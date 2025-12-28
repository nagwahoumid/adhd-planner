'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, KeyboardEvent } from 'react';

export default function HouseAnimation() {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      router.push('/energy');
    }, 350);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Show open house on hover, focus, or click
  const showOpen = isHovered || isClicked;

  return (
    <div className={`house-container ${isClicked ? 'house-clicked' : ''}`}>
      <div className="house-images-wrapper">
        <Image
          src="/landing/house_closed.png"
          alt="House closed"
          fill
          className="house-image house-closed pixel"
          style={{ opacity: showOpen ? 0 : 1 }}
          priority
          unoptimized
          sizes="100vw"
        />
        <Image
          src="/landing/house_open.png"
          alt="House open"
          fill
          className="house-image house-open pixel"
          style={{ opacity: showOpen ? 1 : 0 }}
          priority
          unoptimized
          sizes="100vw"
        />
      </div>
      {/* Door hotspot - invisible clickable area over the door */}
      <div
        className="door-hotspot"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => !isClicked && setIsHovered(false)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Enter the house"
      />
    </div>
  );
}

