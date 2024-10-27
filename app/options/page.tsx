"use client";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

export default function AboutPage() {
    const [settings, setSettings] = useState({
        draft_border: "#ffffff",
        banColor: "#716f6f",
        bluePicksColor: "#18a4d1",
        redPicksColor: "#ea5f5f",
        backgroundColor: "#0c0c0c",
        fontColor: "#ffffff",
        placeholderColor: "#474444"
    });
    const [isMounted, setIsMounted] = useState(false);

    function handleColorChange(color: string, key:string) {
        setSettings((prevSettings) => {
            const updatedSettings = { ...prevSettings, [key]: color };
            document.documentElement.style.setProperty(`--${key}`, color);
            return updatedSettings;
        });
    }

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("settings", JSON.stringify(settings));
        }
    }, [settings, isMounted]);

    useEffect(() => {
        if (typeof window !== undefined) {
            const storedSettings = localStorage.getItem("settings");
            if (storedSettings) {
                const parsedSettings = JSON.parse(storedSettings);
                setSettings(parsedSettings);
                Object.keys(parsedSettings).forEach((key) => {
                    document.documentElement.style.setProperty(`--${key}`, parsedSettings[key]);
                });
            }
            setIsMounted(true);
        }
    }, []);

    return (
        <>
            <h1>Options</h1>
            <label htmlFor="draftBorderColor">Draft Border Color</label>
            <HexColorPicker
                color={settings.draft_border}
                onChange={(color) => handleColorChange(color, "draft_border")}
            />
            <label htmlFor="banColor">Ban Color</label>
            <HexColorPicker
                color={settings.banColor}
                onChange={(color) => handleColorChange(color, "banColor")}
            />
            <label htmlFor="bluePicksColor">Blue Picks Color</label>
            <HexColorPicker
                color={settings.bluePicksColor}
                onChange={(color) => handleColorChange(color, "bluePicksColor")}
            />
            <label htmlFor="redPicksColor">Red Picks Color</label>
            <HexColorPicker
                color={settings.redPicksColor}
                onChange={(color) => handleColorChange(color, "redPicksColor")}
            />
            <label htmlFor="backgroundColor">Background Color</label>
            <HexColorPicker
                color={settings.backgroundColor}
                onChange={(color) => handleColorChange(color, "backgroundColor")}
            />
            <label htmlFor="fontColor">Font Color</label>
            <HexColorPicker
                color={settings.fontColor}
                onChange={(color) => handleColorChange(color, "fontColor")}
            />
            <div className="testDiv">
                <p style={{ color: `var(--fontColor)`, backgroundColor: `var(--backgroundColor)` }}>
                    Preview Text
                </p>
            </div>
            <label htmlFor="placeholderColor">Placeholder Color</label>
            <HexColorPicker
                color={settings.placeholderColor}
                onChange={(color)=> handleColorChange(color, "placeholderColor")}
            />
        </>
    );
}
