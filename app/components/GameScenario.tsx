
"use client";
import { useState } from "react";
import champInfo from '../components/champInfo.json'; // Adjust the path as necessary
import styles from "./GameScenario.module.css";
import ChampPick from "@/app/components/ChampPick";

export default function GameScenario() {

    return (
        <>
            <div className={styles.draftSet}>
                <ChampPick position={"blueBan"}/>
                <ChampPick position={"redBan"}/>
                <ChampPick position={"blueBan"}/>
                <ChampPick position={"redBan"}/>
                <ChampPick position={"blueBan"}/>
                <ChampPick position={"redBan"}/>
                <ChampPick position={"B1"}/>
                <ChampPick position={"R1"}/>
                <ChampPick position={"B2"}/>
                <ChampPick position={"R2"}/>
                <ChampPick position={"B3"}/>
                <ChampPick position={"R3"}/>
                <ChampPick position={"blueBan"}/>
                <ChampPick position={"redBan"}/>
                <ChampPick position={"blueBan"}/>
                <ChampPick position={"redBan"}/>
                <ChampPick position={"B4"}/>
                <ChampPick position={"R4"}/>
                <ChampPick position={"B5"}/>
                <ChampPick position={"R5"}/>
            </div>
        </>
    );
}
