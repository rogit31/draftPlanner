"use client";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import {Simulate} from "react-dom/test-utils";
import keyDown = Simulate.keyDown;

export default function AboutPage() {

    type SettingsType = {
        draft_border: string;
        banColor: string;
        bluePicksColor: string;
        redPicksColor: string;
        backgroundColor: string;
        fontColor: string;
        placeholderColor: string;
    };

    const defaultSettings = {
        draft_border: "#ffffff",
        banColor: "#716f6f",
        bluePicksColor: "#18a4d1",
        redPicksColor: "#ea5f5f",
        backgroundColor: "#0c0c0c",
        fontColor: "#ffffff",
        placeholderColor: "#474444"
    }
    const [settings, setSettings] = useState(defaultSettings);
    const [isMounted, setIsMounted] = useState(false);

    function handleColorChange(color: string, key:string) {
        setSettings((prevSettings) => {
            const updatedSettings = { ...prevSettings, [key]: color };
            document.documentElement.style.setProperty(`--${key}`, color);
            return updatedSettings;
        });
    }

    function handleReset(){
        setSettings(defaultSettings)
        Object.keys(defaultSettings).forEach((key) => {
            document.documentElement.style.setProperty(`--${key}`, defaultSettings[key as keyof SettingsType]);
        })
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
            <h1 className="text-4xl font-bold text-center m-5">Options</h1>
            <div className="optionsWrapper">
                <p className="text-center"><i>You will need to refresh the page for changes to take effect.</i></p>
                <div className="optionsContainer">
                    <div className="optionsItem">
                        <label htmlFor="draftBorderColor">Draft Border Color</label>
                        <HexColorPicker
                            color={settings.draft_border}
                            onChange={(color) => handleColorChange(color, "draft_border")}
                        />
                    </div>
                    <div className="optionsItem">
                        <label htmlFor="banColor">Ban Color</label>
                        <HexColorPicker
                            color={settings.banColor}
                            onChange={(color) => handleColorChange(color, "banColor")}
                        />
                    </div>
                    <div className="optionsItem">
                        <label htmlFor="bluePicksColor">Blue Picks Color</label>
                        <HexColorPicker
                            color={settings.bluePicksColor}
                            onChange={(color) => handleColorChange(color, "bluePicksColor")}
                        />
                    </div>
                    <div className="optionsItem">
                        <label htmlFor="redPicksColor">Red Picks Color</label>
                        <HexColorPicker
                            color={settings.redPicksColor}
                            onChange={(color) => handleColorChange(color, "redPicksColor")}
                        />
                    </div>
                    <div className="optionsItem">
                        <label htmlFor="backgroundColor">Background Color</label>
                        <HexColorPicker
                            color={settings.backgroundColor}
                            onChange={(color) => handleColorChange(color, "backgroundColor")}
                        />
                    </div>
                    <div className="optionsItem">
                        <label htmlFor="fontColor">Font Color</label>
                        <HexColorPicker
                            color={settings.fontColor}
                            onChange={(color) => handleColorChange(color, "fontColor")}
                        />
                    </div>
                    <div className="optionsItem">
                        <label htmlFor="placeholderColor">Placeholder Color</label>
                        <HexColorPicker
                            color={settings.placeholderColor}
                            onChange={(color) => handleColorChange(color, "placeholderColor")}
                        />
                    </div>
                </div>
            </div>
            <div className="resetColorsButtonWrapper">
                <button className="resetColorsButton" onClick={() => handleReset()}>Reset Colors</button>
            </div>

        </>
    );
}
