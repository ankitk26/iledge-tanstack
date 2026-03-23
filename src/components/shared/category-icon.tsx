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
	// Uncategorized
	Question: QuestionIcon,

	// Housing
	House: HouseIcon,
	Scroll: ScrollIcon,
	Umbrella: UmbrellaIcon,
	Lightning: LightningIcon,
	Wrench: WrenchIcon,

	// Transportation
	GasPump: GasPumpIcon,
	Train: TrainIcon,
	MapPin: MapPinIcon,
	ShieldCheck: ShieldCheckIcon,
	Park: ParkIcon,

	// Travel
	AirplaneTilt: AirplaneTiltIcon,
	Bed: BedIcon,
	SuitcaseRolling: SuitcaseRollingIcon,
	Car: CarIcon,
	Shield: ShieldIcon,

	// Food & Dining
	ShoppingCart: ShoppingCartIcon,
	ForkKnife: ForkKnifeIcon,
	Coffee: CoffeeIcon,
	Pizza: PizzaIcon,
	IceCream: IceCreamIcon,
	Cookie: CookieIcon,
	Bicycle: BicycleIcon,

	// Health & Wellness
	Stethoscope: StethoscopeIcon,
	FirstAid: FirstAidIcon,
	Pill: PillIcon,
	Tooth: ToothIcon,
	Barbell: BarbellIcon,

	// Finances
	Coins: CoinsIcon,
	PiggyBank: PiggyBankIcon,
	FileText: FileTextIcon,
	HandCoins: HandCoinsIcon,

	// Entertainment
	FilmStrip: FilmStripIcon,
	Repeat: RepeatIcon,
	MicrophoneStage: MicrophoneStageIcon,
	Palette: PaletteIcon,

	// Education
	GraduationCap: GraduationCapIcon,
	BookOpen: BookOpenIcon,
	Buildings: BuildingsIcon,

	// Shopping & Personal
	TShirt: TShirtIcon,
	Laptop: LaptopIcon,
	Sparkle: SparkleIcon,
	Couch: CouchIcon,

	// Gifts & Donations
	Gift: GiftIcon,
	HandHeart: HandHeartIcon,

	// Miscellaneous
	Warning: WarningIcon,
	Wallet: WalletIcon,
	Receipt: ReceiptIcon,

	// Communication
	Phone: PhoneIcon,
	WifiHigh: WifiHighIcon,

	// Pet Expenses
	Bone: BoneIcon,
	Heartbeat: HeartbeatIcon,
	Scissors: ScissorsIcon,
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
