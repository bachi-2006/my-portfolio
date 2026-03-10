import { useState, useEffect } from "react";
import BoxLoader from "./ui/box-loader";

const LOADER_DURATION = 3000;
const SLIDE_DURATION = 800;

const Loader = () => {
	const [loading, setLoading] = useState(true);
	const [removed, setRemoved] = useState(false);

	useEffect(() => {
		const loadTimer = setTimeout(() => setLoading(false), LOADER_DURATION);
		return () => clearTimeout(loadTimer);
	}, []);

	useEffect(() => {
		if (!loading) {
			const removeTimer = setTimeout(() => setRemoved(true), SLIDE_DURATION);
			return () => clearTimeout(removeTimer);
		}
	}, [loading]);

	if (removed) return null;

	return (
		<div className={`loader-root ${!loading ? "loader-slide-up" : ""}`}>
			<BoxLoader />
		</div>
	);
};

export default Loader;
