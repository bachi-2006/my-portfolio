import React, { useState, useEffect, useRef } from "react";
import ScrambleText from "../components/ScrambleText";
import { Projects as projectdata } from "../assets/Projects";

// 1. WEBGL FLUID SHADER ART SUB-COMPONENT
function FluidShaderCanvas() {
	const canvasRef = useRef(null);
	const requestRef = useRef(null);
	const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
	const [webglError, setWebglError] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const gl = canvas.getContext("webgl");
		if (!gl) {
			console.warn("WebGL not supported");
			setWebglError(true);
			return;
		}

		const vsSource = `
			attribute vec2 position;
			void main() {
				gl_Position = vec4(position, 0.0, 1.0);
			}
		`;

		const fsSource = `
			#ifdef GL_ES
			precision highp float;
			#endif
			uniform vec2 u_resolution;
			uniform vec2 u_mouse;
			uniform float u_time;
			void main() {
				vec2 uv = gl_FragCoord.xy / u_resolution.xy;
				vec2 mouse = vec2(u_mouse.x, u_resolution.y - u_mouse.y) / u_resolution.xy;
				float dist = distance(uv, mouse);
				
				vec3 color = vec3(0.06, 0.06, 0.09);
				
				// Ambient grid flow
				color.r += sin(uv.x * 6.0 + u_time * 0.5) * 0.03;
				color.g += cos(uv.y * 6.0 - u_time * 0.5) * 0.03;
				color.b += sin(dist * 8.0 - u_time * 0.8) * 0.04;
				
				// Dynamic fluid ripple
				float ripple = sin(dist * 35.0 - u_time * 5.0) * 0.5 + 0.5;
				float glow = 1.0 - smoothstep(0.0, 0.35, dist);
				
				color += vec3(0.1, 0.45, 0.95) * ripple * glow * 1.7;
				
				// High-intensity core
				float coreGlow = 1.0 - smoothstep(0.0, 0.07, dist);
				color += vec3(0.35, 0.85, 1.0) * coreGlow * 1.3;
				
				gl_FragColor = vec4(color, 1.0);
			}
		`;

		const createShader = (gl, type, source) => {
			const shader = gl.createShader(type);
			gl.shaderSource(shader, source);
			gl.compileShader(shader);
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				console.error("Shader compile error:", gl.getShaderInfoLog(shader));
				gl.deleteShader(shader);
				return null;
			}
			return shader;
		};

		const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
		const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
		if (!vs || !fs) return;

		const program = gl.createProgram();
		gl.attachShader(program, vs);
		gl.attachShader(program, fs);
		gl.linkProgram(program);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error("Program linking error:", gl.getProgramInfoLog(program));
			return;
		}

		gl.useProgram(program);

		const uResolution = gl.getUniformLocation(program, "u_resolution");
		const uMouse = gl.getUniformLocation(program, "u_mouse");
		const uTime = gl.getUniformLocation(program, "u_time");

		const positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		const positions = new Float32Array([
			-1, -1,
			 1, -1,
			-1,  1,
			-1,  1,
			 1, -1,
			 1,  1,
		]);
		gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

		const positionLocation = gl.getAttribLocation(program, "position");
		gl.enableVertexAttribArray(positionLocation);
		gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			canvas.width = rect.width * window.devicePixelRatio;
			canvas.height = rect.height * window.devicePixelRatio;
			gl.viewport(0, 0, canvas.width, canvas.height);
		};
		resize();
		window.addEventListener("resize", resize);

		let startTime = performance.now();

		const render = () => {
			const m = mouseRef.current;
			m.x += (m.targetX - m.x) * 0.12;
			m.y += (m.targetY - m.y) * 0.12;

			gl.clearColor(0, 0, 0, 1);
			gl.clear(gl.COLOR_BUFFER_BIT);

			gl.useProgram(program);

			gl.uniform2f(uResolution, canvas.width, canvas.height);
			
			const rect = canvas.getBoundingClientRect();
			const canvasMouseX = ((m.x - rect.left) / rect.width) * canvas.width;
			const canvasMouseY = ((m.y - rect.top) / rect.height) * canvas.height;
			gl.uniform2f(uMouse, canvasMouseX, canvasMouseY);

			const elapsed = (performance.now() - startTime) / 1000.0;
			gl.uniform1f(uTime, elapsed);

			gl.drawArrays(gl.TRIANGLES, 0, 6);

			requestRef.current = requestAnimationFrame(render);
		};

		render();

		const handleMouseMove = (e) => {
			mouseRef.current.targetX = e.clientX;
			mouseRef.current.targetY = e.clientY;
		};

		canvas.addEventListener("mousemove", handleMouseMove);
		
		const handleTouchMove = (e) => {
			if (e.touches.length > 0) {
				mouseRef.current.targetX = e.touches[0].clientX;
				mouseRef.current.targetY = e.touches[0].clientY;
			}
		};
		canvas.addEventListener("touchmove", handleTouchMove);

		const rect = canvas.getBoundingClientRect();
		mouseRef.current.x = mouseRef.current.targetX = rect.left + rect.width / 2;
		mouseRef.current.y = mouseRef.current.targetY = rect.top + rect.height / 2;

		return () => {
			window.removeEventListener("resize", resize);
			if (canvas) {
				canvas.removeEventListener("mousemove", handleMouseMove);
				canvas.removeEventListener("touchmove", handleTouchMove);
			}
			cancelAnimationFrame(requestRef.current);
		};
	}, []);

	if (webglError) {
		return (
			<div className="w-full h-full flex flex-col items-center justify-center text-red-400 font-mono p-4 text-center">
				<span className="text-2xl mb-2">⚠️</span>
				<span>WebGL Initialization Failed</span>
				<span className="text-xs text-gray-500 mt-1">Please ensure WebGL is enabled in your browser.</span>
			</div>
		);
	}

	return (
		<canvas
			ref={canvasRef}
			className="w-full h-full block bg-black rounded-lg cursor-crosshair"
		/>
	);
}

// 2. 3D PARTICLE GLOBE CANVAS SUB-COMPONENT
function ParticleGlobeCanvas() {
	const canvasRef = useRef(null);
	const requestRef = useRef(null);
	const mouseRef = useRef({ x: 0, y: 0, isActive: false, px: 0, py: 0 });
	const rotationRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
	const dragRef = useRef({ isDragging: false, startX: 0, startY: 0 });

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let width = canvas.width;
		let height = canvas.height;

		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			width = canvas.width = rect.width * window.devicePixelRatio;
			height = canvas.height = rect.height * window.devicePixelRatio;
		};
		resize();
		window.addEventListener("resize", resize);

		const particleCount = 220;
		const particles = [];
		const radius = 120;

		for (let i = 0; i < particleCount; i++) {
			const theta = Math.acos(Math.random() * 2 - 1);
			const phi = Math.random() * 2 * Math.PI;

			const x = radius * Math.sin(theta) * Math.cos(phi);
			const y = radius * Math.sin(theta) * Math.sin(phi);
			const z = radius * Math.cos(theta);

			particles.push({
				x, y, z,
				ox: x, oy: y, oz: z,
				px: 0, py: 0, pz: 0,
				size: Math.random() * 1.8 + 1
			});
		}

		const fov = 320;

		const rotateY = (point, angle) => {
			const cos = Math.cos(angle);
			const sin = Math.sin(angle);
			const x = point.x * cos - point.z * sin;
			const z = point.x * sin + point.z * cos;
			return { ...point, x, z };
		};

		const rotateX = (point, angle) => {
			const cos = Math.cos(angle);
			const sin = Math.sin(angle);
			const y = point.y * cos - point.z * sin;
			const z = point.x * sin + point.z * cos;
			return { ...point, y, z };
		};

		const render = () => {
			ctx.fillStyle = "rgba(10, 10, 11, 0.85)";
			ctx.fillRect(0, 0, width, height);

			const centerX = width / 2;
			const centerY = height / 2;

			const rot = rotationRef.current;
			if (!dragRef.current.isDragging) {
				rot.targetY += 0.0035;
				rot.targetX *= 0.95;
			}
			rot.x += (rot.targetX - rot.x) * 0.1;
			rot.y += (rot.targetY - rot.y) * 0.1;

			const mouse = mouseRef.current;
			let mouseXLocal = null;
			let mouseYLocal = null;
			if (mouse.isActive) {
				const rect = canvas.getBoundingClientRect();
				mouseXLocal = (mouse.px - rect.left) * (width / rect.width) - centerX;
				mouseYLocal = (mouse.py - rect.top) * (height / rect.height) - centerY;
			}

			const transformed = particles.map(p => {
				let pt = { x: p.ox, y: p.oy, z: p.oz };

				pt = rotateY(pt, rot.y);
				pt = rotateX(pt, rot.x);

				if (mouseXLocal !== null && mouseYLocal !== null) {
					const dx = pt.x - mouseXLocal;
					const dy = pt.y - mouseYLocal;
					const dist = Math.sqrt(dx * dx + dy * dy);

					if (dist < 100) {
						const force = ((100 - dist) / 100) * 20;
						pt.x -= (dx / dist) * force;
						pt.y -= (dy / dist) * force;
					}
				}

				const scale = fov / (fov + pt.z);
				const projX = pt.x * scale + centerX;
				const projY = pt.y * scale + centerY;

				return {
					...p,
					px: projX,
					py: projY,
					scale,
					depth: pt.z
				};
			});

			transformed.sort((a, b) => b.depth - a.depth);

			ctx.lineWidth = 1.0;
			for (let i = 0; i < transformed.length; i++) {
				const p1 = transformed[i];
				if (p1.depth > 120) continue; 

				let connections = 0;
				for (let j = i + 1; j < transformed.length; j++) {
					if (connections > 3) break;
					const p2 = transformed[j];
					
					const dx = p1.px - p2.px;
					const dy = p1.py - p2.py;
					const dist = Math.sqrt(dx * dx + dy * dy);

					if (dist < 55) {
						const depthDiff = Math.abs(p1.depth - p2.depth);
						if (depthDiff > 35) continue;

						const alpha = (1 - dist / 55) * 0.16 * p1.scale;
						ctx.strokeStyle = `rgba(165, 232, 68, ${alpha})`;
						ctx.beginPath();
						ctx.moveTo(p1.px, p1.py);
						ctx.lineTo(p2.px, p2.py);
						ctx.stroke();
						connections++;
					}
				}
			}

			for (const p of transformed) {
				const alpha = ((p.depth + radius) / (2 * radius)) * 0.7 + 0.3;
				ctx.fillStyle = `rgba(165, 232, 68, ${alpha})`;
				
				ctx.beginPath();
				ctx.arc(p.px, p.py, p.size * p.scale, 0, 2 * Math.PI);
				ctx.fill();

				if (p.depth < -85) {
					ctx.strokeStyle = `rgba(165, 232, 68, ${alpha * 0.25})`;
					ctx.lineWidth = 0.5;
					ctx.beginPath();
					ctx.arc(p.px, p.py, p.size * p.scale * 3.5, 0, 2 * Math.PI);
					ctx.stroke();
				}
			}

			requestRef.current = requestAnimationFrame(render);
		};

		render();

		const handleMouseDown = (e) => {
			dragRef.current.isDragging = true;
			dragRef.current.startX = e.clientX;
			dragRef.current.startY = e.clientY;
		};

		const handleMouseMove = (e) => {
			mouseRef.current.px = e.clientX;
			mouseRef.current.py = e.clientY;
			mouseRef.current.isActive = true;

			if (!dragRef.current.isDragging) return;

			const dx = e.clientX - dragRef.current.startX;
			const dy = e.clientY - dragRef.current.startY;

			rotationRef.current.targetY += dx * 0.005;
			rotationRef.current.targetX -= dy * 0.005;
			rotationRef.current.targetX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotationRef.current.targetX));

			dragRef.current.startX = e.clientX;
			dragRef.current.startY = e.clientY;
		};

		const handleMouseUp = () => {
			dragRef.current.isDragging = false;
		};

		const handleMouseLeave = () => {
			dragRef.current.isDragging = false;
			mouseRef.current.isActive = false;
		};

		const handleTouchStart = (e) => {
			if (e.touches.length > 0) {
				dragRef.current.isDragging = true;
				dragRef.current.startX = e.touches[0].clientX;
				dragRef.current.startY = e.touches[0].clientY;
				mouseRef.current.px = e.touches[0].clientX;
				mouseRef.current.py = e.touches[0].clientY;
				mouseRef.current.isActive = true;
			}
		};

		const handleTouchMove = (e) => {
			if (e.touches.length > 0) {
				const tx = e.touches[0].clientX;
				const ty = e.touches[0].clientY;
				mouseRef.current.px = tx;
				mouseRef.current.py = ty;

				if (dragRef.current.isDragging) {
					const dx = tx - dragRef.current.startX;
					const dy = ty - dragRef.current.startY;

					rotationRef.current.targetY += dx * 0.005;
					rotationRef.current.targetX -= dy * 0.005;
					rotationRef.current.targetX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotationRef.current.targetX));

					dragRef.current.startX = tx;
					dragRef.current.startY = ty;
				}
			}
		};

		canvas.addEventListener("mousedown", handleMouseDown);
		canvas.addEventListener("mousemove", handleMouseMove);
		canvas.addEventListener("mouseup", handleMouseUp);
		canvas.addEventListener("mouseleave", handleMouseLeave);
		canvas.addEventListener("touchstart", handleTouchStart);
		canvas.addEventListener("touchmove", handleTouchMove);
		canvas.addEventListener("touchend", handleMouseUp);

		return () => {
			window.removeEventListener("resize", resize);
			canvas.removeEventListener("mousedown", handleMouseDown);
			canvas.removeEventListener("mousemove", handleMouseMove);
			canvas.removeEventListener("mouseup", handleMouseUp);
			canvas.removeEventListener("mouseleave", handleMouseLeave);
			canvas.removeEventListener("touchstart", handleTouchStart);
			canvas.removeEventListener("touchmove", handleTouchMove);
			canvas.removeEventListener("touchend", handleMouseUp);
			cancelAnimationFrame(requestRef.current);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="w-full h-full block bg-black rounded-lg cursor-grab active:cursor-grabbing"
		/>
	);
}

// 3. CYBER TELEMETRY SYSTEM DIAGNOSTIC SUB-COMPONENT
function ShellTelemetry() {
	const canvasRef = useRef(null);
	const [stats, setStats] = useState({
		cpu: 45,
		temp: 54,
		ram: 3.2,
		fps: 60,
		uptime: 0,
		packets: 1024
	});

	useEffect(() => {
		const timer = setInterval(() => {
			setStats(prev => ({
				cpu: Math.floor(Math.random() * 25) + 35,
				temp: Math.floor(Math.random() * 6) + 52 + (Math.random() > 0.85 ? 8 : 0),
				ram: parseFloat((3.15 + Math.random() * 0.25).toFixed(2)),
				fps: Math.random() > 0.94 ? 59 : 60,
				uptime: prev.uptime + 1,
				packets: prev.packets + Math.floor(Math.random() * 3) + 1
			}));
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let width = canvas.width = canvas.getBoundingClientRect().width;
		let height = canvas.height = canvas.getBoundingClientRect().height;

		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			width = canvas.width = rect.width;
			height = canvas.height = rect.height;
		};
		window.addEventListener("resize", resize);

		const alphabet = "0123456789X$/\\#@%&*";
		const fontSize = 10;
		const columns = Math.floor(width / fontSize);

		const rainDrops = [];
		for (let x = 0; x < columns; x++) {
			rainDrops[x] = Math.random() * -80;
		}

		let frameId;
		const drawMatrix = () => {
			ctx.fillStyle = "rgba(10, 10, 11, 0.12)";
			ctx.fillRect(0, 0, width, height);

			ctx.fillStyle = "rgba(165, 232, 68, 0.22)";
			ctx.font = fontSize + "px monospace";

			for (let i = 0; i < rainDrops.length; i++) {
				const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
				const x = i * fontSize;
				const y = rainDrops[i] * fontSize;

				if (y > 0) {
					ctx.fillText(text, x, y);
				}

				if (y > height && Math.random() > 0.975) {
					rainDrops[i] = 0;
				}
				rainDrops[i]++;
			}

			frameId = requestAnimationFrame(drawMatrix);
		};

		drawMatrix();

		return () => {
			window.removeEventListener("resize", resize);
			cancelAnimationFrame(frameId);
		};
	}, []);

	const progressWidth = (val, max) => `${(val / max) * 100}%`;

	return (
		<div className="relative w-full h-full bg-[#0a0a0b] rounded-lg overflow-hidden flex flex-col font-mono text-xs text-green-400 p-4 border border-green-500/20 shadow-[0_0_20px_rgba(165,232,68,0.05)] select-none">
			<canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" />

			<div className="relative z-10 flex flex-col h-full justify-between">
				<div className="flex justify-between items-center border-b border-green-500/20 pb-2 mb-2">
					<div className="flex items-center gap-2">
						<span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
						<span className="font-bold text-white tracking-widest uppercase text-[10px] sm:text-xs">Telemetry online</span>
					</div>
					<div className="text-[10px]">UPTIME: {stats.uptime}s</div>
				</div>

				<div className="grid grid-cols-2 gap-3 my-auto">
					<div className="bg-black/60 border border-green-500/10 p-2 rounded">
						<div className="text-[9px] text-gray-500 uppercase">CPU LOAD</div>
						<div className="text-sm font-bold text-white mt-0.5">{stats.cpu}%</div>
						<div className="w-full bg-gray-900 h-1 rounded-full mt-1.5 overflow-hidden">
							<div className="bg-[#a5e844] h-full transition-all duration-500" style={{ width: progressWidth(stats.cpu, 100) }} />
						</div>
					</div>

					<div className="bg-black/60 border border-green-500/10 p-2 rounded">
						<div className="text-[9px] text-gray-500 uppercase">CORE TEMP</div>
						<div className={`text-sm font-bold mt-0.5 ${stats.temp > 60 ? 'text-red-400' : 'text-white'}`}>
							{stats.temp}°C
						</div>
						<div className="w-full bg-gray-900 h-1 rounded-full mt-1.5 overflow-hidden">
							<div className={`h-full transition-all duration-500 ${stats.temp > 60 ? 'bg-red-500' : 'bg-[#a5e844]'}`} style={{ width: progressWidth(stats.temp, 90) }} />
						</div>
					</div>

					<div className="bg-black/60 border border-green-500/10 p-2 rounded">
						<div className="text-[9px] text-gray-500 uppercase">RAM USAGE</div>
						<div className="text-sm font-bold text-white mt-0.5">{stats.ram} GB</div>
						<div className="w-full bg-gray-900 h-1 rounded-full mt-1.5 overflow-hidden">
							<div className="bg-[#a5e844] h-full transition-all duration-500" style={{ width: progressWidth(stats.ram, 8) }} />
						</div>
					</div>

					<div className="bg-black/60 border border-green-500/10 p-2 rounded">
						<div className="text-[9px] text-gray-500 uppercase">PACKETS OUTED</div>
						<div className="text-sm font-bold text-white mt-0.5">{stats.packets}</div>
						<div className="text-[9px] text-gray-500 mt-1 flex justify-between">
							<span>RX: {(stats.packets * 0.58).toFixed(0)}</span>
							<span>TX: {(stats.packets * 0.42).toFixed(0)}</span>
						</div>
					</div>
				</div>

				<div className="bg-black/85 border border-green-500/15 p-2 rounded text-[9px] sm:text-[10px] space-y-1 mt-2 max-h-[85px] overflow-y-auto scrollbar-thin">
					<div className="text-gray-500 font-bold border-b border-green-500/10 pb-0.5 mb-1">SYSTEM LOG EVENTS</div>
					<div className="text-gray-400">[0.00] sys: security daemon initialized</div>
					<div className="text-gray-400">[0.05] sys: webgl shader module load: OK</div>
					{stats.temp > 59 && <div className="text-red-400 font-bold animate-pulse">[WARN] thermal protection system throttle trigger</div>}
					{stats.cpu > 55 && <div className="text-yellow-400">[INFO] process balancer shifted load balance</div>}
					<div className="text-green-500">[OK] system diagnostics routing active</div>
				</div>
			</div>
		</div>
	);
}

// 4. PROMPT FORGE SUB-COMPONENT
function CommandForgePanel({ commands }) {
	const [frame, setFrame] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setFrame((prev) => (prev + 1) % 4);
		}, 1800);

		return () => clearInterval(timer);
	}, []);

	const commandCount = commands.length;
	const recentCommands = commands.slice(0, 4);
	const palette = [
		"Discover a sharper interaction pattern from the last command trail.",
		"Translate terminal activity into motion, glow, and system rhythm.",
		"Turn utility commands into a playable portfolio sandbox.",
		"Use the shell to launch shaders, telemetry, or the globe again.",
	];
	const promptText = palette[frame];

	return (
		<div className="relative w-full h-full rounded-lg overflow-hidden border border-fuchsia-500/20 bg-[#09090d] p-4 text-white shadow-[0_0_24px_rgba(236,72,153,0.08)] select-none">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.22),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(165,232,68,0.16),_transparent_35%)] pointer-events-none" />
			<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent opacity-80" />

			<div className="relative z-10 flex h-full flex-col">
				<div className="flex items-center justify-between border-b border-white/10 pb-2">
					<div>
						<div className="text-[10px] uppercase tracking-[0.45em] text-fuchsia-300 font-bold">Prompt Forge</div>
						<div className="text-[10px] text-gray-400 mt-1">A command-reactive idea engine for the experiments sandbox</div>
					</div>
					<div className="text-[10px] text-gray-400 uppercase tracking-[0.3em]">{commandCount} commands</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
					{[
						{ label: "Reroute", value: "Terminal input now drives a visual playground." },
						{ label: "Pulse", value: commandCount > 0 ? `${Math.min(commandCount * 7, 99)}%` : "0%" },
						{ label: "Mode", value: commandCount > 3 ? "Adaptive" : "Booting" },
					].map((item) => (
						<div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
							<div className="text-[9px] uppercase tracking-[0.35em] text-gray-500">{item.label}</div>
							<div className="text-sm sm:text-base font-semibold text-white mt-2">{item.value}</div>
						</div>
					))}
				</div>

				<div className="mt-4 grid grid-cols-1 gap-3">
					<div className="rounded-xl border border-fuchsia-500/15 bg-black/45 p-4">
						<div className="text-[9px] uppercase tracking-[0.35em] text-gray-500">Generated prompt</div>
						<div className="mt-2 text-base sm:text-lg font-medium leading-relaxed text-gray-100">{promptText}</div>
						<div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
							<div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-yellow-300 to-lime-400 transition-all duration-700" style={{ width: `${45 + frame * 15}%` }} />
						</div>
					</div>

					<div className="rounded-xl border border-white/10 bg-white/5 p-4">
						<div className="text-[9px] uppercase tracking-[0.35em] text-gray-500 mb-2">Recent commands</div>
						<div className="flex flex-wrap gap-2">
							{recentCommands.length > 0 ? recentCommands.map((command, index) => (
								<span
									key={`${command}-${index}`}
									className="rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1 text-[11px] text-fuchsia-200"
								>
									{command}
								</span>
							)) : (
								<span className="text-sm text-gray-400">No commands captured yet. Try <span className="text-fuchsia-300">help</span> or <span className="text-fuchsia-300">forge</span>.</span>
							)}
						</div>
					</div>
				</div>

				<div className="mt-auto pt-4 flex flex-col sm:flex-row sm:items-center gap-2 text-[11px] text-gray-400">
					<div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 uppercase tracking-[0.3em] text-[10px] text-fuchsia-200">Live synthesis</div>
					<div>Commands now reshape the sandbox instead of only logging text.</div>
				</div>
			</div>
		</div>
	);
}

// 4. OFFLINE FALLBACK SUB-COMPONENT
function SandboxOffline({ onRun }) {
	return (
		<div className="w-full h-full bg-[#1b1b1c] rounded-lg border border-[#2d2d2e] p-6 flex flex-col justify-between items-center relative overflow-hidden font-mono text-center select-none min-h-[380px]">
			<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

			<div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gray-600/30 pointer-events-none" />
			<div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gray-600/30 pointer-events-none" />
			<div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gray-600/30 pointer-events-none" />
			<div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gray-600/30 pointer-events-none" />

			<div className="flex flex-col items-center mt-4">
				<div className="relative w-14 h-14 rounded-full bg-yellow-500/5 flex items-center justify-center border border-yellow-500/20 mb-3 animate-pulse">
					<div className="w-9 h-9 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30">
						<span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping"></span>
					</div>
				</div>
				<h3 className="text-white text-xs sm:text-sm font-semibold tracking-widest uppercase">SANDBOX UNIT OFFLINE</h3>
				<p className="text-gray-500 text-[10px] sm:text-xs mt-2 max-w-xs leading-relaxed">
					Initialize and execute code files in the terminal shell to render visual experiments in real-time.
				</p>
			</div>

			<div className="w-full space-y-2 mt-4 z-10">
				<div className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold">AVAILABLE SCRIPTS</div>
				<div className="grid grid-cols-1 gap-2">
					<button
						onClick={() => onRun("./fluid-shader-art.frag")}
						className="w-full py-2 px-3 text-xs bg-[#242426] hover:bg-[#2e2e30] border border-gray-700/50 rounded flex items-center justify-between text-left text-gray-300 transition-colors group"
					>
						<span>🎨 fluid-shader-art.frag</span>
						<span className="text-gray-500 group-hover:text-yellow-400 font-bold transition-colors">RUN &rarr;</span>
					</button>
					<button
						onClick={() => onRun("./r3f-globe-physics.js")}
						className="w-full py-2 px-3 text-xs bg-[#242426] hover:bg-[#2e2e30] border border-gray-700/50 rounded flex items-center justify-between text-left text-gray-300 transition-colors group"
					>
						<span>🌍 r3f-globe-physics.js</span>
						<span className="text-gray-500 group-hover:text-yellow-400 font-bold transition-colors">RUN &rarr;</span>
					</button>
					<button
						onClick={() => onRun("./terminal-shell.sh")}
						className="w-full py-2 px-3 text-xs bg-[#242426] hover:bg-[#2e2e30] border border-gray-700/50 rounded flex items-center justify-between text-left text-gray-300 transition-colors group"
					>
						<span>🐚 terminal-shell.sh</span>
						<span className="text-gray-500 group-hover:text-yellow-400 font-bold transition-colors">RUN &rarr;</span>
					</button>
				</div>
			</div>
		</div>
	);
}

// 5. MAIN EXPERIMENTS PAGE COMPONENT
export default function Experiments() {
	const [activeExperiment, setActiveExperiment] = useState(null);
	const [history, setHistory] = useState([]);
	const [input, setInput] = useState("");
	const [cmdHistory, setCmdHistory] = useState([]);
	const [historyIdx, setHistoryIdx] = useState(-1);
	const terminalEndRef = useRef(null);

	const simulatedFS = {
		"status.txt": `"Prompt Forge online. Type 'help' for commands, or 'forge' to switch the sandbox into creative synthesis mode."`,
		"promptforge.txt": `Prompt Forge
=============

This sandbox turns your terminal history into a live creative surface.

Try:
- forge
- terminal-shell.sh
- cat status.txt

The panel on the right reacts to command history and stays in sync with the shell.`,
		"fluid-shader-art.frag": `#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 mouse = vec2(u_mouse.x, u_resolution.y - u_mouse.y) / u_resolution.xy;
    float dist = distance(uv, mouse);
    
    vec3 color = vec3(0.06, 0.06, 0.09);
    
    // Ambient flow
    color.r += sin(uv.x * 6.0 + u_time * 0.5) * 0.03;
    color.g += cos(uv.y * 6.0 - u_time * 0.5) * 0.03;
    color.b += sin(dist * 8.0 - u_time * 0.8) * 0.04;
    
    // Fluid ripple
    float ripple = sin(dist * 35.0 - u_time * 5.0) * 0.5 + 0.5;
    float glow = 1.0 - smoothstep(0.0, 0.35, dist);
    
    color += vec3(0.1, 0.45, 0.95) * ripple * glow * 1.7;
    
    // Highlight center
    float coreGlow = 1.0 - smoothstep(0.0, 0.07, dist);
    color += vec3(0.35, 0.85, 1.3) * coreGlow * 1.3;
    
    gl_FragColor = vec4(color, 1.0);
}`,
		"r3f-globe-physics.js": `import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function GlobeParticles() {
    const meshRef = useRef();
    useFrame((state) => {
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    });
    return (
        <points ref={meshRef}>
            <sphereGeometry args={[2, 64, 64]} />
            <pointsMaterial color="#a5e844" size={0.02} transparent opacity={0.8} />
        </points>
    );
}

export default function PhysicsGlobe() {
    return (
        <div className="h-full w-full bg-black">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <GlobeParticles />
                <OrbitControls enableZoom={true} />
            </Canvas>
        </div>
    );
}`,
		"terminal-shell.sh": `#!/bin/bash
# Creative Sandbox Shell
echo "Booting creative sandbox protocol..."
echo "Loading shader, globe, and telemetry modules..."
echo "Spinning up prompt synthesis engine..."
echo "System online. Type 'help' for commands or 'forge' for the interactive prompt lab."`
	};

	const executeDirectly = (cmd) => {
		setHistory(prev => [...prev, { type: "system", text: `guest@rohith-workspace:~ $ ${cmd}` }]);
		setCmdHistory(prev => [cmd, ...prev]);
		setHistoryIdx(-1);
		setInput("");
		processCommand(cmd);
	};

	// Set initial console boot sequence
	useEffect(() => {
		setHistory([
			{ type: "system", text: "guest@rohith-workspace:~ $ init-experiments" },
			{ type: "log", text: "[INFO] Booting Sandbox Environment..." },
			{ type: "log", text: "[INFO] Loading WebGL, Shader modules, and Three.js physics..." },
			{ type: "log", text: "[INFO] Status: Creative development playground online." },
			{ type: "warn", text: "[WARN] Prompt Forge is warmed up and ready for input." },
			{ type: "system", text: "guest@rohith-workspace:~ $ ls -la --color" },
			{
				type: "output",
				text: (
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-gray-400 font-light font-mono select-none">
						<div><span className="text-blue-400">drwxr-xr-x</span> 2 guest staff 4096 <span className="text-[#feca66] font-medium cursor-pointer" onClick={() => executeDirectly("ls -la")}>.</span></div>
						<div><span className="text-blue-400">drwxr-xr-x</span> 8 guest staff 4096 <span className="text-blue-400 cursor-pointer" onClick={() => executeDirectly("ls -la")}>..</span></div>
						<div><span className="text-green-400">-rwxr-xr-x</span> 1 guest staff 1248 <span className="text-[#a5e844] font-medium cursor-pointer hover:underline animate-pulse" onClick={() => executeDirectly("./r3f-globe-physics.js")}>r3f-globe-physics.js</span></div>
						<div><span className="text-gray-400">-rw-r--r--</span> 1 guest staff 512 <span className="text-gray-300 cursor-pointer hover:underline" onClick={() => executeDirectly("./fluid-shader-art.frag")}>fluid-shader-art.frag</span></div>
						<div><span className="text-green-400">-rwxr-xr-x</span> 1 guest staff 892 <span className="text-[#a5e844] font-medium cursor-pointer hover:underline" onClick={() => executeDirectly("./terminal-shell.sh")}>terminal-shell.sh</span></div>
						<div><span className="text-fuchsia-400">-rw-r--r--</span> 1 guest staff 664 <span className="text-fuchsia-300 cursor-pointer hover:underline" onClick={() => executeDirectly("cat promptforge.txt")}>promptforge.txt</span></div>
						<div><span className="text-gray-400">-rw-r--r--</span> 1 guest staff 512 <span className="text-gray-300 cursor-pointer hover:underline" onClick={() => executeDirectly("cat status.txt")}>status.txt</span></div>
					</div>
				)
			},
			{ type: "system", text: "guest@rohith-workspace:~ $ cat status.txt" },
			{ type: "italic", text: '"Prompt Forge online. Type \'help\' for commands, or \'forge\' to switch the sandbox into creative synthesis mode."' },
		]);
	}, []);

	const scrollToBottom = () => {
		terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [history]);

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			const command = input.trim();
			if (!command) return;

			setHistory(prev => [...prev, { type: "system", text: `guest@rohith-workspace:~ $ ${command}` }]);
			setCmdHistory(prev => [command, ...prev]);
			setHistoryIdx(-1);
			setInput("");

			processCommand(command);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			if (historyIdx < cmdHistory.length - 1) {
				const nextIdx = historyIdx + 1;
				setHistoryIdx(nextIdx);
				setInput(cmdHistory[nextIdx]);
			}
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			if (historyIdx > 0) {
				const nextIdx = historyIdx - 1;
				setHistoryIdx(nextIdx);
				setInput(cmdHistory[nextIdx]);
			} else if (historyIdx === 0) {
				setHistoryIdx(-1);
				setInput("");
			}
		}
	};

	const processCommand = (cmdStr) => {
		const parts = cmdStr.trim().split(/\s+/);
		const baseCmd = parts[0].toLowerCase();
		const arg = parts.slice(1).join(" ");

		// Standard executions matching
		if (baseCmd === "./r3f-globe-physics.js" || baseCmd === "r3f-globe-physics.js" || (baseCmd === "node" && arg === "r3f-globe-physics.js")) {
			setHistory(prev => [
				...prev,
				{ type: "log", text: "[INFO] Starting React Three Fiber Globe Sandbox..." },
				{ type: "log", text: "[INFO] Registering rigid bodies and colliders..." },
				{ type: "log", text: "[SUCCESS] Rendering interactive Physics Globe in canvas!" }
			]);
			setActiveExperiment("globe");
			return;
		}

		if (baseCmd === "./fluid-shader-art.frag" || baseCmd === "fluid-shader-art.frag" || (baseCmd === "view" && arg === "fluid-shader-art.frag")) {
			setHistory(prev => [
				...prev,
				{ type: "log", text: "[INFO] Compiling fragment shader 'fluid-shader-art.frag'..." },
				{ type: "log", text: "[INFO] Linking WebGL program context..." },
				{ type: "log", text: "[SUCCESS] Fluid ripple fragment shader rendering online." }
			]);
			setActiveExperiment("shader");
			return;
		}

		if (baseCmd === "./terminal-shell.sh" || baseCmd === "terminal-shell.sh" || (baseCmd === "sh" && arg === "terminal-shell.sh") || (baseCmd === "bash" && arg === "terminal-shell.sh")) {
			setHistory(prev => [
				...prev,
				{ type: "log", text: "[INFO] Executing terminal-shell.sh..." },
				{ type: "log", text: "[INFO] Starting creative sandbox shell..." },
				{ type: "log", text: "[SUCCESS] Prompt Forge and telemetry views initialized." }
			]);
			setActiveExperiment("shell");
			return;
		}

		if (baseCmd === "forge" || baseCmd === "prompt-forge" || baseCmd === "promptforge") {
			setHistory(prev => [
				...prev,
				{ type: "log", text: "[INFO] Launching Prompt Forge..." },
				{ type: "log", text: "[INFO] Binding command history to visual synthesis panel..." },
				{ type: "log", text: "[SUCCESS] Adaptive prompt lab is now live." }
			]);
			setActiveExperiment("forge");
			return;
		}

		if (baseCmd === "./status.txt" || baseCmd === "status.txt") {
			setHistory(prev => [...prev, { type: "error", text: "bash: ./status.txt: Permission denied. Try: 'cat status.txt'" }]);
			return;
		}

		if (baseCmd.startsWith("./")) {
			setHistory(prev => [...prev, { type: "error", text: `bash: ${baseCmd}: No such file or directory` }]);
			return;
		}

		switch (baseCmd) {
			case "help":
				setHistory(prev => [
					...prev,
					{
						type: "output",
						text: (
							<div className="text-gray-400 font-mono space-y-1 select-none">
								<div className="text-white font-bold mb-1">System Commands:</div>
								<div>  <span className="text-yellow-400 font-bold">about</span>       - Learn more about Rohith Dachepally</div>
								<div>  <span className="text-yellow-400 font-bold">projects</span>    - List all visual portfolio projects</div>
								<div>  <span className="text-yellow-400 font-bold">project [n]</span> - View details of project #n (e.g. 'project 2')</div>
								<div>  <span className="text-yellow-400 font-bold">skills</span>      - Display technical skill levels</div>
								<div>  <span className="text-yellow-400 font-bold">contact</span>     - Get contact links and social media handles</div>
								<div>  <span className="text-yellow-400 font-bold">forge</span>       - Open the new Prompt Forge experiment</div>
								<div>  <span className="text-yellow-400 font-bold">ssh [host]</span>  - Connect to a remote host (try: 'ssh ssh.moriliu.com')</div>
								<div>  <span className="text-yellow-400 font-bold">clear</span>       - Clear the terminal screen</div>
								<div className="text-white font-bold mt-2 mb-1">Sandbox Commands:</div>
								<div>  <span className="text-yellow-400 font-bold">ls</span>          - List simulated workspace scripts</div>
								<div>  <span className="text-yellow-400 font-bold">cat [file]</span>   - Read source code of a workspace file</div>
								<div>  <span className="text-yellow-400 font-bold">./[script]</span>   - Execute script file to load sandbox monitor</div>
								<div>  <span className="text-yellow-400 font-bold">init-experiments</span> - Reboot experiments loader</div>
							</div>
						)
					}
				]);
				break;
			case "clear":
				setHistory([]);
				break;
			case "ls":
				const isLong = arg.includes("-l");
				const hasAll = arg.includes("-a") || isLong;
				
				setHistory(prev => [
					...prev,
					{
						type: "output",
						text: (
							<div className="font-mono text-gray-400 select-none space-y-1">
								{isLong ? (
									<div className="flex flex-col gap-1">
										{hasAll && (
											<>
												<div><span className="text-blue-400">drwxr-xr-x</span> 2 guest staff 4096 <span className="text-[#feca66] font-medium cursor-pointer" onClick={() => executeDirectly("ls -la")}>.</span></div>
												<div><span className="text-blue-400">drwxr-xr-x</span> 8 guest staff 4096 <span className="text-blue-400 cursor-pointer" onClick={() => executeDirectly("ls -la")}>..</span></div>
											</>
										)}
										<div><span className="text-green-400">-rwxr-xr-x</span> 1 guest staff 1248 <span className="text-[#a5e844] font-medium cursor-pointer hover:underline" onClick={() => executeDirectly("./r3f-globe-physics.js")}>r3f-globe-physics.js</span></div>
										<div><span className="text-gray-400">-rw-r--r--</span> 1 guest staff 512 <span className="text-gray-300 cursor-pointer hover:underline" onClick={() => executeDirectly("./fluid-shader-art.frag")}>fluid-shader-art.frag</span></div>
										<div><span className="text-green-400">-rwxr-xr-x</span> 1 guest staff 892 <span className="text-[#a5e844] font-medium cursor-pointer hover:underline" onClick={() => executeDirectly("./terminal-shell.sh")}>terminal-shell.sh</span></div>
										<div><span className="text-fuchsia-400">-rw-r--r--</span> 1 guest staff 664 <span className="text-fuchsia-300 cursor-pointer hover:underline" onClick={() => executeDirectly("cat promptforge.txt")}>promptforge.txt</span></div>
										<div><span className="text-gray-400">-rw-r--r--</span> 1 guest staff 512 <span className="text-gray-300 cursor-pointer hover:underline" onClick={() => executeDirectly("cat status.txt")}>status.txt</span></div>
									</div>
								) : (
									<div className="flex flex-wrap gap-x-6 gap-y-1">
										{hasAll && (
											<>
												<span className="text-[#feca66] font-medium cursor-pointer" onClick={() => executeDirectly("ls")}>.</span>
												<span className="text-blue-400 cursor-pointer" onClick={() => executeDirectly("ls")}>..</span>
											</>
										)}
										<span className="text-[#a5e844] font-medium cursor-pointer hover:underline" onClick={() => executeDirectly("./r3f-globe-physics.js")}>r3f-globe-physics.js</span>
										<span className="text-gray-300 cursor-pointer hover:underline" onClick={() => executeDirectly("./fluid-shader-art.frag")}>fluid-shader-art.frag</span>
										<span className="text-[#a5e844] font-medium cursor-pointer hover:underline" onClick={() => executeDirectly("./terminal-shell.sh")}>terminal-shell.sh</span>
										<span className="text-fuchsia-300 cursor-pointer hover:underline" onClick={() => executeDirectly("cat promptforge.txt")}>promptforge.txt</span>
										<span className="text-gray-300 cursor-pointer hover:underline" onClick={() => executeDirectly("cat status.txt")}>status.txt</span>
									</div>
								)}
							</div>
						)
					}
				]);
				break;
			case "cat":
				if (!arg) {
					setHistory(prev => [...prev, { type: "error", text: "cat: missing file operand" }]);
					break;
				}
				const filename = arg.trim();
				const content = simulatedFS[filename];
				if (content) {
					setHistory(prev => [
						...prev,
						{
							type: "output",
							text: (
								<pre className="font-mono text-[11px] sm:text-xs text-gray-300 bg-black/40 p-3 border border-gray-700/30 rounded-lg max-h-[250px] overflow-y-auto whitespace-pre-wrap leading-relaxed select-text scrollbar-thin">
									{content}
								</pre>
							)
						}
					]);
				} else {
					setHistory(prev => [...prev, { type: "error", text: `cat: ${filename}: No such file or directory` }]);
				}
				break;
			case "about":
				setHistory(prev => [
					...prev,
					{
						type: "output",
						text: (
							<div className="text-gray-300 font-mono leading-relaxed space-y-2 select-text">
								<div className="text-yellow-400 font-bold">ROHITH DACHEPALLY</div>
								<div>A creative developer and full-stack software engineer building real-time applications, AI systems, and interactive digital interfaces. Focused on crafting premium aesthetics and high-performance products.</div>
								<div>Currently working on IoT global control ecosystems, generative voice assistants, and immersive travel planners.</div>
							</div>
						)
					}
				]);
				break;
			case "projects":
				setHistory(prev => [
					...prev,
					{
						type: "output",
						text: (
							<div className="text-gray-400 font-mono space-y-1 select-none">
								<div className="text-yellow-400 font-bold">PORTFOLIO PROJECTS:</div>
								{projectdata.map((proj, idx) => (
									<div key={idx} className="cursor-pointer hover:text-white" onClick={() => executeDirectly(`project ${idx + 1}`)}>
										<span className="text-green-400">[{idx + 1}]</span> {proj.title} - <span className="text-blue-400">{proj.categories.join(", ")}</span>
									</div>
								))}
								<div className="text-[10px] text-gray-500 mt-2">Type 'project [number]' (e.g., 'project 2') or click a project above.</div>
							</div>
						)
					}
				]);
				break;
			case "project":
				const idx = parseInt(arg) - 1;
				if (isNaN(idx) || idx < 0 || idx >= projectdata.length) {
					setHistory(prev => [...prev, { type: "error", text: "Error: Invalid project index. Usage: 'project [1-14]'" }]);
				} else {
					const proj = projectdata[idx];
					setHistory(prev => [
						...prev,
						{
							type: "output",
							text: (
								<div className="text-gray-300 font-mono space-y-2 border border-gray-700/60 p-3 rounded-lg bg-[#252526] select-text">
									<div className="text-yellow-400 font-bold text-base sm:text-lg">{proj.title}</div>
									<div className="text-xs text-blue-400 font-bold">{proj.categories.join(" | ")}</div>
									<div className="text-xs sm:text-sm font-light leading-relaxed">{proj.description}</div>
									<div className="text-xs"><span className="text-yellow-300">Stack:</span> {proj.tools.join(", ")}</div>
									{proj.links && proj.links.length > 0 && (
										<div className="text-xs">
											<span className="text-yellow-300">Links:</span>{" "}
											{proj.links.map((link, lIdx) => (
												<a key={lIdx} href={link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 mr-4 break-all">
													{link.includes("github.com") ? "GitHub" : "Live Link"}
												</a>
											))}
										</div>
									)}
								</div>
							)
						}
					]);
				}
				break;
			case "skills":
				setHistory(prev => [
					...prev,
					{
						type: "output",
						text: (
							<div className="text-gray-400 font-mono space-y-2 select-text">
								<div className="text-yellow-400 font-bold">TECHNICAL SKILLSET:</div>
								<div>Frontend:   <span className="text-yellow-400">[██████████████░░]</span> (React, Vite, Next.js, Tailwind, R3F)</div>
								<div>Backend:    <span className="text-yellow-400">[████████████░░░░]</span> (Node.js, Express, FastAPI, Flask, WebSockets)</div>
								<div>App Dev:    <span className="text-yellow-400">[███████████░░░░░]</span> (Flutter, Dart, Capacitor, Android)</div>
								<div>Databases:  <span className="text-yellow-400">[████████████░░░░]</span> (Firebase RTDB, Firestore, Supabase, SQL)</div>
								<div>AI/ML/CV:   <span className="text-yellow-400">[██████████░░░░░░]</span> (IBM Granite LLM, Gemini API, MediaPipe, OpenCV)</div>
							</div>
						)
					}
				]);
				break;
			case "contact":
				setHistory(prev => [
					...prev,
					{
						type: "output",
						text: (
							<div className="text-gray-400 font-mono space-y-1 select-text">
								<div className="text-yellow-400 font-bold">GET IN TOUCH:</div>
								<div>GitHub:    <a href="https://github.com/bachi-2006" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 font-mono font-medium">github.com/bachi-2006</a></div>
								<div>LinkedIn:  <a href="https://www.linkedin.com/in/rohith-dachepally" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 font-mono font-medium font-mono">linkedin.com/in/rohith-dachepally</a></div>
								<div>Email:     <span className="text-white select-all">rohith.dachepally@example.com</span></div>
							</div>
						)
					}
				]);
				break;
			case "ssh":
				const host = arg.trim();
				if (host === "ssh.moriliu.com" || host === "morilliu" || host === "mori") {
					setHistory(prev => [
						...prev,
						{ type: "log", text: "Connecting to ssh.moriliu.com..." },
						{ type: "log", text: "Connection established." },
						{
							type: "output",
							text: (
								<div className="font-mono text-[10px] sm:text-xs text-gray-300 leading-none space-y-4 select-text">
									<div className="flex flex-col md:flex-row gap-6">
										<pre className="text-cyan-400 font-mono text-[6px] sm:text-[8px] leading-tight select-none">
{` ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⢀⣼⣿⣿⣿⣿⣿⣿⣿⣟⣿⣿⣿⣿⣿
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣰⣾⣿⣿⣿⣿⣿⣿⡿⠁⠸⠿⠿⢍⠉⠁⠈
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠊⠻⣿⡿⠟⠻⠟⢿⡿⠟⠀⠀⠀⠀⠀⠀⠀⠀
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⡆⠀⠞⠀⠀⠀⠀⠀⣠⣤⣶⣦⣤⣀⠀⠀⠀⠀
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠊⠀⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣩⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠀⠀⠀⠀⣀⠉⠁⠈⣽⣿⣿⣿⣿⣿⡟⠉⣙⠻
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⡦⡇⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⠁⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢼⠀⠀⠀⠀⠀⢹⣿⣿⣿⡟⠉⠻⣟⢻⣿⣿⣿⣿⣿
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣾⣿⣷⠀⠀⠀⠀⠸⣿⣿⣿⣿⣶⣿⣿⣿⣿⣿⣿⣿⣿
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣰⣾⣿⣿⣿⣿⣆⠀⠀⠀⠀⢻⣿⣿⠁⣤⣤⣤⣬⣙⣿⣿⣿⣿
 ⠀⠀⠀⠀⠀⠀⠀⠀⠠⣶⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠻⣿⣦⣬⣭⣭⣽⣿⣿⣿⣿⣿
 ⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⠿⠋
 ⠀⠀⠀⠀⠀⠀⠀⠐⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠛⠋⠉⢀⣴⣾
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣿⣿⣿
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⣿⣿⣿
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠺⠿⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿`}
										</pre>
										<div className="flex-1 space-y-4 pt-4 leading-normal font-sans text-[11px] sm:text-xs text-gray-300">
											<div>
												<h3 className="text-sm font-bold text-white font-mono">_mori</h3>
												<p className="text-[10px] text-cyan-400 font-mono mt-1">is a creator & storyteller on the internet</p>
											</div>
											<div className="space-y-2">
												<p>Mori Liu is a product manager at Hume AI, building empathic voice AI models. Previously studied CS at Columbia University.</p>
												<p>Her work sits at the intersection of human nature, technology, and philosophy.</p>
											</div>
											<div className="font-mono text-[11px] text-yellow-200">
												✦ Creations   Reflections   Contacts
											</div>
										</div>
									</div>
									<div className="text-gray-500 text-xs font-mono pt-2">[Connection to ssh.moriliu.com closed]</div>
								</div>
							)
						}
					]);
				} else {
					setHistory(prev => [...prev, { type: "error", text: "Error: Host name required. Try: 'ssh ssh.moriliu.com'" }]);
				}
				break;
			case "init-experiments":
				setHistory([]);
				setActiveExperiment(null);
				const bootSequence = [
					{ type: "system", text: "guest@rohith-workspace:~ $ init-experiments" },
					{ type: "log", text: "[INFO] Booting Sandbox Environment..." },
					{ type: "log", text: "[INFO] Loading WebGL, Shader modules, and Three.js physics..." },
					{ type: "log", text: "[INFO] Status: Creative development playground cooking..." },
					{ type: "warn", text: "[WARN] Experiments are actively cooking in the kitchen." }
				];
				bootSequence.forEach((line, index) => {
					setTimeout(() => {
						setHistory(prev => [...prev, line]);
					}, index * 200);
				});
				break;
			default:
				setHistory(prev => [
					...prev, 
					{ type: "error", text: `Error: Command not found: '${baseCmd}'. Type 'help' for suggestions.` },
					{ type: "log", text: "Type 'help' to start..." }
				]);
		}
	};

	return (
		<article className="active" data-page="experiments">
			<header>
				<h2 className="h2 article-title spacegrotesk text-white">Experiments</h2>
			</header>

			<div className="w-full flex flex-col xl:flex-row gap-6 items-stretch justify-center py-6 max-w-6xl mx-auto px-4">
				{/* Left Panel: Terminal Shell */}
				<div className="flex-1 min-w-[320px] max-w-2xl w-full flex flex-col">
					<div className="w-full h-full bg-[#1e1e1f] border border-[#363636] rounded-xl shadow-2xl overflow-hidden font-mono text-sm md:text-base text-gray-300 flex flex-col justify-between">
						{/* Terminal Header Bar */}
						<div className="bg-[#2a2a2b] px-4 py-3 flex items-center justify-between border-b border-[#363636] select-none">
							<div className="flex gap-2">
								<span className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] opacity-90 cursor-pointer" onClick={() => setHistory([])}></span>
								<span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] opacity-90"></span>
								<span className="w-3.5 h-3.5 rounded-full bg-[#27c93f] opacity-90"></span>
							</div>
							<div className="text-gray-400 text-xs sm:text-sm font-medium tracking-wide font-mono">
								guest@rohith-workspace:~
							</div>
							<div className="w-12"></div>
						</div>

						{/* Terminal Body */}
						<div className="p-5 md:p-6 h-[400px] overflow-y-auto space-y-4 leading-relaxed scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
							{history.map((line, idx) => (
								<div key={idx}>
									{line.type === "system" && (
										<div className="text-yellow-400 font-bold">{line.text}</div>
									)}
									{line.type === "log" && (
										<div className="text-gray-500 pl-4">{line.text}</div>
									)}
									{line.type === "warn" && (
										<div className="text-yellow-500/80 pl-4">{line.text}</div>
									)}
									{line.type === "italic" && (
										<div className="pl-4 text-yellow-200/90 italic font-light tracking-wide border-l-2 border-yellow-500/40 pl-3">{line.text}</div>
									)}
									{line.type === "output" && (
										<div className="pl-4">{line.text}</div>
									)}
									{line.type === "error" && (
										<div className="text-red-400 pl-4">{line.text}</div>
									)}
								</div>
							))}
							<div ref={terminalEndRef} />
						</div>

						{/* Interactive Command Input Line */}
						<div className="bg-[#171718] border-t border-[#2a2a2b] px-5 py-3.5 flex items-center gap-2">
							<span className="text-yellow-400 font-bold select-none">guest@rohith-workspace:~ $</span>
							<input
								type="text"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={handleKeyDown}
								className="flex-1 bg-transparent outline-none border-none text-white font-mono caret-yellow-400"
								placeholder="Type 'help' to start..."
								autoFocus
							/>
						</div>
					</div>
				</div>

				{/* Right Panel: Live Sandbox Window */}
				<div className="flex-1 min-w-[320px] max-w-2xl w-full flex flex-col">
					<div className="w-full h-full bg-[#1e1e1f] border border-[#363636] rounded-xl shadow-2xl overflow-hidden flex flex-col">
						{/* Sandbox Header */}
						<div className="bg-[#2a2a2b] px-4 py-3 flex items-center justify-between border-b border-[#363636] select-none font-mono">
							<div className="flex items-center gap-2">
								<span className={`w-2 h-2 rounded-full ${activeExperiment ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></span>
								<span className="text-gray-400 text-xs sm:text-sm font-medium tracking-wide uppercase">
									{activeExperiment ? `Sandbox: ${activeExperiment}` : "Sandbox: Offline"}
								</span>
							</div>
							{activeExperiment && (
								<button
									onClick={() => {
										setHistory(prev => [...prev, { type: "log", text: `[SYSTEM] Terminating active sandbox: ${activeExperiment}` }]);
										setActiveExperiment(null);
									}}
									className="px-2.5 py-0.5 bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 hover:border-red-500/50 text-red-400 rounded text-xs transition-colors uppercase font-bold"
								>
									Stop
								</button>
							)}
						</div>

						{/* Sandbox Body / Visualizer */}
						<div className="p-4 flex-1 flex items-center justify-center min-h-[400px] bg-[#171718]">
							{activeExperiment === "shader" && <FluidShaderCanvas />}
							{activeExperiment === "globe" && <ParticleGlobeCanvas />}
							{activeExperiment === "shell" && <ShellTelemetry />}
							{activeExperiment === "forge" && <CommandForgePanel commands={cmdHistory} />}
							{!activeExperiment && <SandboxOffline onRun={executeDirectly} />}
						</div>
					</div>
				</div>
			</div>

			{/* Floating Badge below terminal */}
			<div className="w-full text-center mt-4">
				<div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e1e1f] border border-[#363636] rounded-full text-xs text-yellow-300/80">
					<span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
					<span className="cristik"><ScrambleText>Interactive Terminal Sandbox Active</ScrambleText></span>
				</div>
			</div>
		</article>
	);
}
