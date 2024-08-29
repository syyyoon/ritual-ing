export const formatSelectedDate = (selectedDate: string) => {
    // 날짜 문자열을 Date 객체로 변환
    const date = new Date(selectedDate);

    // 월, 일, 연도를 가져옴
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
}
