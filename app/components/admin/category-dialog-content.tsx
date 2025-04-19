import {
  BookOpen,
  Building,
  Bus,
  Car,
  CreditCard,
  Dog,
  Dumbbell,
  Gift,
  Heart,
  Mic2,
  PhoneCall,
  Plane,
  Receipt,
  ShoppingBag,
  Utensils,
  Wallet,
  Wrench,
} from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export default function CategoryDialogContent() {
  return (
    <ScrollArea className="mt-4 max-h-[50vh]">
      <div className="grid gap-8">
        {/* Communication */}
        <div className="flex flex-col items-start">
          <h3 className="font-medium text-foreground/60">Communication</h3>
          <div className="flex items-center mt-6 gap-12">
            <div className="flex flex-col items-center gap-2">
              <Button size="icon">
                <PhoneCall />
              </Button>
              <h5 className="text-sm">Phone bill</h5>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="icon">
                <Mic2 />
              </Button>
              <h5 className="text-sm">Concert</h5>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="icon">
                <Dog />
              </Button>
              <h5 className="text-sm">Pet</h5>
            </div>
          </div>
        </div>

        <Separator />

        {/* Food & Shopping */}
        <div className="flex flex-col items-start">
          <h3 className="font-medium text-foreground/60">Lifestyle</h3>
          <div className="flex items-center mt-6 gap-12 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <Button size="icon">
                <Utensils />
              </Button>
              <h5 className="text-sm">Dining</h5>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="icon">
                <ShoppingBag />
              </Button>
              <h5 className="text-sm">Shopping</h5>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="icon">
                <Gift />
              </Button>
              <h5 className="text-sm">Gifts</h5>
            </div>
          </div>
        </div>

        <Separator />

        {/* Travel & Transport */}
        <div className="flex flex-col items-start">
          <h3 className="font-medium text-foreground/60">Travel & Transport</h3>
          <div className="flex items-center mt-6 gap-12 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <Button size="icon">
                <Car />
              </Button>
              <h5 className="text-sm">Fuel</h5>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="icon">
                <Bus />
              </Button>
              <h5 className="text-sm">Commute</h5>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="icon">
                <Plane />
              </Button>
              <h5 className="text-sm">Flights</h5>
            </div>
          </div>
        </div>

        <Separator />

        {/* Health & Fitness */}
        <div className="flex flex-col items-start">
          <h3 className="font-medium text-foreground/60">Health & Fitness</h3>
          <div className="flex items-center mt-6 gap-12 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <Button size="icon">
                <Heart />
              </Button>
              <h5 className="text-sm">Doctor</h5>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="icon">
                <Dumbbell />
              </Button>
              <h5 className="text-sm">Gym</h5>
            </div>
          </div>
        </div>

        <Separator />

        {/* Finance */}
        <div className="flex flex-col items-start">
          <h3 className="font-medium text-foreground/60">Finance</h3>
          <div className="flex items-center mt-6 gap-12 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <Button size="icon">
                <CreditCard />
              </Button>
              <h5 className="text-sm">EMI</h5>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="icon">
                <Wallet />
              </Button>
              <h5 className="text-sm">Savings</h5>
            </div>
          </div>
        </div>

        <Separator />

        {/* Education & Utilities */}
        <div className="flex flex-col items-start">
          <h3 className="font-medium text-foreground/60">Others</h3>
          <div className="flex items-center mt-6 gap-12 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <Button size="icon">
                <BookOpen />
              </Button>
              <h5 className="text-sm">Education</h5>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="icon">
                <Wrench />
              </Button>
              <h5 className="text-sm">Repair</h5>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="icon">
                <Building />
              </Button>
              <h5 className="text-sm">Rent</h5>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="icon">
                <Receipt />
              </Button>
              <h5 className="text-sm">Bills</h5>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
