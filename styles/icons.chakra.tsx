import { createIcon } from "@chakra-ui/icon";

const EyeIcon = createIcon({
    displayName: 'EyeIcon',
    viewBox: "0 0 15.243 12.5",
    path: [
        <path className="a" d="M8.621,4.5C5.157,4.5,2.2,7.092,1,10.75,2.2,14.408,5.157,17,8.621,17s6.423-2.592,7.621-6.25C15.044,7.092,12.085,4.5,8.621,4.5Zm0,10.417c-1.912,0-3.464-1.867-3.464-4.167S6.709,6.583,8.621,6.583s3.464,1.867,3.464,4.167S10.534,14.917,8.621,14.917Zm0-6.667a2.316,2.316,0,0,0-2.079,2.5,2.316,2.316,0,0,0,2.079,2.5,2.316,2.316,0,0,0,2.079-2.5A2.316,2.316,0,0,0,8.621,8.25Z" transform="translate(-1 -4.5)" />
    ]
})

const ResetFiltersIcon = createIcon({
    displayName: 'ResetFiltersIcon',
    viewBox: "0 0 24 24",
    path: [

        <g transform="translate(-1061 -139)">
            <g transform="translate(1061 139)">
                <path className="a" d="M0,0H24V24H0Z" />
                <path className="b" d="M12,5V2L8,6l4,4V7a6,6,0,0,1,1,11.91v2.02A8,8,0,0,0,12,5Z" />
                <path className="b" d="M6,13A5.979,5.979,0,0,1,7.76,8.76L6.34,7.34A8,8,0,0,0,11,20.93V18.91A6.007,6.007,0,0,1,6,13Z" />
            </g>
        </g>
    ]
})

export {
    EyeIcon,
    ResetFiltersIcon
}