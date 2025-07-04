import { assets } from "@/assets/assets";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectLoc = ({ placeholder, optionData, func }) => {
  return (
    <Select required onValueChange={(value) => func(value)} className="ml-20">
      <SelectTrigger className="w-[135px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {optionData.map((city) => (
          <SelectItem key={city} value={city}>
            {city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectLoc;
