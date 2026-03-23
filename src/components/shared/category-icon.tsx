import {
	AirplaneTiltIcon,
	BarbellIcon,
	BedIcon,
	BicycleIcon,
	BookOpenIcon,
	BoneIcon,
	BuildingsIcon,
	CarIcon,
	CoinsIcon,
	CoffeeIcon,
	CookieIcon,
	CouchIcon,
	FileTextIcon,
	FilmStripIcon,
	FirstAidIcon,
	ForkKnifeIcon,
	GasPumpIcon,
	GiftIcon,
	GraduationCapIcon,
	HandCoinsIcon,
	HandHeartIcon,
	HeartbeatIcon,
	HouseIcon,
	IceCreamIcon,
	LaptopIcon,
	LightningIcon,
	MapPinIcon,
	MicrophoneStageIcon,
	PaletteIcon,
	ParkIcon,
	PhoneIcon,
	PiggyBankIcon,
	PillIcon,
	PizzaIcon,
	QuestionIcon,
	ReceiptIcon,
	RepeatIcon,
	ScissorsIcon,
	ScrollIcon,
	ShieldCheckIcon,
	ShieldIcon,
	ShoppingCartIcon,
	SparkleIcon,
	StethoscopeIcon,
	SuitcaseRollingIcon,
	ToothIcon,
	TrainIcon,
	TShirtIcon,
	UmbrellaIcon,
	WalletIcon,
	WarningIcon,
	WrenchIcon,
	WifiHighIcon,
} from "@phosphor-icons/react";
import { ComponentProps } from "react";

const iconMapping: Record<
	string,
	React.ComponentType<ComponentProps<"svg">>
> = {
	// Housing
	Scroll: ScrollIcon,
	Umbrella: UmbrellaIcon,
	Zap: LightningIcon,
	Wrench: WrenchIcon,

	// Transportation
	Fuel: GasPumpIcon,
	MapPin: MapPinIcon,
	ShieldCheck: ShieldCheckIcon,
	ParkingMeter: ParkIcon,

	// Travel
	Plane: AirplaneTiltIcon,
	Bed: BedIcon,
	Luggage: SuitcaseRollingIcon,
	Car: CarIcon,
	Shield: ShieldIcon,

	// Food & Dining
	ShoppingBasket: ShoppingCartIcon,
	Utensils: ForkKnifeIcon,
	Coffee: CoffeeIcon,
	Pizza: PizzaIcon,
	IceCreamCone: IceCreamIcon,
	Croissant: CookieIcon,

	// Health & Wellness
	Stethoscope: StethoscopeIcon,
	Pill: PillIcon,
	Laugh: ToothIcon,
	Dumbbell: BarbellIcon,
	BriefcaseMedical: FirstAidIcon,

	// Finances
	Coins: CoinsIcon,
	PiggyBank: PiggyBankIcon,
	FileText: FileTextIcon,
	HandCoins: HandCoinsIcon,

	// Entertainment
	Clapperboard: FilmStripIcon,
	Repeat: RepeatIcon,
	Palette: PaletteIcon,
	MicVocal: MicrophoneStageIcon,

	// Education
	GraduationCap: GraduationCapIcon,
	BookOpen: BookOpenIcon,
	Building2: BuildingsIcon,

	// Shopping & Personal
	Shirt: TShirtIcon,
	Laptop: LaptopIcon,
	ScanFace: SparkleIcon,
	Sofa: CouchIcon,

	// Gifts & Donations
	Gift: GiftIcon,
	HeartHandshake: HandHeartIcon,

	// Miscellaneous
	TriangleAlert: WarningIcon,
	Wallet: WalletIcon,
	ReceiptText: ReceiptIcon,

	// Communication
	Phone: PhoneIcon,
	Wifi: WifiHighIcon,

	// Pet Expenses
	Bone: BoneIcon,
	HeartPulse: HeartbeatIcon,
	Scissors: ScissorsIcon,

	// Emergency & Contingency
	TrainFront: TrainIcon,
	Bike: BicycleIcon,

	// Uncategorized
	CircleHelp: QuestionIcon,
	House: HouseIcon,
};

export default function CategoryIcon({
	iconName,
	...props
}: ComponentProps<"svg"> & { iconName: string }) {
	const Icon = iconMapping[iconName];

	if (!Icon) {
		return <QuestionIcon {...props} />;
	}

	return <Icon {...props} />;
}
