"use client";

import Loader from "@/components/loading-spinner"

export default function Loading(){
    return(
        <>
        <div className="container">
            <div className="flex">
                <h2>Carregando</h2>
                <Loader/>
            </div>
        </div>
        </>
    )
}