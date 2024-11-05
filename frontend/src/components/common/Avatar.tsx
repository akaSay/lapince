import * as adventurerStyle from "@dicebear/adventurer";
import * as botttsStyle from "@dicebear/bottts";
import { createAvatar } from "@dicebear/core";
import * as funEmojiStyle from "@dicebear/fun-emoji";
import * as loreleiStyle from "@dicebear/lorelei";

interface AvatarProps {
  seed: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "funEmoji" | "lorelei" | "adventurer" | "bottts";
}

const Avatar: React.FC<AvatarProps> = ({
  seed,
  size = "md",
  className = "",
  variant = "lorelei",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-20 h-20",
  };

  const sizeInPixels = {
    sm: 32,
    md: 40,
    lg: 80,
  };

  const getAvatarStyle = () => {
    switch (variant) {
      case "funEmoji":
        return funEmojiStyle;
      case "lorelei":
        return loreleiStyle;
      case "adventurer":
        return adventurerStyle;
      case "bottts":
        return botttsStyle;
      default:
        return funEmojiStyle;
    }
  };

  try {
    const avatar = createAvatar(getAvatarStyle() as never, {
      seed,
      size: sizeInPixels[size],
    });

    const dataUrl = avatar.toDataUriSync();
    {
      seed;
      variant;
      dataUrl.slice(0, 50) + "...";
    }

    return (
      <img
        src={dataUrl}
        alt={`Avatar de ${seed}`}
        className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
        onError={(e) => console.error("Avatar image error:", e)}
      />
    );
  } catch (error) {
    return (
      <div
        className={`bg-gray-600 rounded-full ${sizeClasses[size]} ${className}`}
      >
        {seed.charAt(0).toUpperCase()}
      </div>
    );
  }
};

export default Avatar;
