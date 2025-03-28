import React, { useState } from "react";
import { uploadFileToSupabase } from "../../ChatControls/uploadFileToSupabase";
import { useTranslation } from "react-i18next";

export const ProfileSettings = ({ id }: { id: string; }) => {
  const [adminName, setAdminName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationSound, setNotificationSound] = useState("");
  const [notificationFrequency, setNotificationFrequency] = useState("daily");
  const [avatarUrl, setAvatarUrl] = useState("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQACWAJYAAD/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/CABEIAMgAyAMBIgACEQEDEQH/xAAvAAEAAgMBAQAAAAAAAAAAAAAABgcCBAUBAwEBAQEAAAAAAAAAAAAAAAAAAAEC/9oADAMBAAIQAxAAAAC3BvIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PfhD4kWfvVBkXIhE2PQAAAAAAAAIRLalMRcgJfEMpbkau0oAAAAAAAEbr2fwAC5ACWwpJGJOoAAAAAAAHErS46kNcXIA2ZbC7eGagAAAAAAAOD3hTvztuPJBUw2iE2J09tQAAAAAAAADRiBPNKrvgWl96mJcvtQSJZ60d4AAAAAAARbCCmeAyFAAZzuApbmROWKAAAAA5XVrQ4vggWAAAAe2hV3blssKAAABpVNYFfoFgAAAAAS2zuxmTKAAABDYWIFgAAAAAE0mRNAAf/xAA9EAACAQICBAoIBAYDAAAAAAABAgMEEQUGACExURIiMEBBUmFxobETICMyM4GR0RAUFnIVNWJjssFCcHP/2gAIAQEAAT8A/wCoamspaNeFU1EUI/uOBp+pcG4Vv4jD428tKaspaxeFTVEUw/tuDzVmVFLMQFAuSTYAaY3nGR2anwtuAg1Gotrb9u4dukkjyyGSR2dztZjcn5/hHI8UgkjdkcbGU2I+emCZykRlp8UbhodQqLa1/dvHborK6hlIKkXBBuCOZ5xxwvKcLp2si/HYH3j1e4dPb62TsbKSjC6hrxt8Bj/xPV7j0dvfzLEqwYfhtRVm3skJAPSegfW2ju0kjO7FnYksT0k7fWR2jkV0Yq6kFSOgjZphtYMQw2nqxb2qAkDoPSPrfmOdpTHgSoD8SZQe4An/AEOQyTKZMCaMn4czAdgIB/3zHPK3weBt04/xPIZGW2DztvnP+I5jm2nM+XZyBcxFZfodfgTyGUqcwZdgJFjKWk+p1eAHMZokngkhkF0kUqw7CLaV9HJh9dNSSjjxta+8dB+Y9ago5MQroaSIceVrX3DpPyGkMSQQRwxiyRqFUdgFuZZky+MXhE0HBWsjFlvqDjqk+R0mhlp5mhmjaORTZlYWI9SGCWomWGGNpJGNlVRcnTLeXxhEJmn4LVkgs1tYQdUHzPNK/C6LE0C1dOkltjbGHcRr0qMiUjsTT1k0Q6rqHH11HT9BSX/mKW/8T99KfIlKjA1FZNKOqihB9dZ0oMLosMQrSU6R32ttY95OvmpIVeESAN51DSXGcMgNpcQplO70gPlp+pMGv/MYPH7aRYxhk5AixCmYno9IB56Ahl4QII3jWOZ4ji9FhUfDq5gpPuoNbN3DTEM7VkxK0Ma06dduM/2GlTW1VY/CqaiWY/1sT4abNn4bdulNW1VG3CpqiWE/0OR4aYfnashIWujWoTrrxX+x0w7F6LFY+HSTBiPeQ6mXvHMMwZrSiL0lAVkqBqeTasfYN58BpNNLUTNNNI0kjG7MxuTyEM0tPMs0MjRyKbqymxGmX81pWlKSvKx1B1JJsWTsO4+B5bNeYjShsOo3tMR7aRT7g3Dt8uUypmI1QXDqx7zAexkY++Nx7fPlMwYsMIwxpVI9O/EhB62/uGju0js7sWZjckm5J38ojNG6ujFWU3BBsQd+mX8WGL4YsrECdOJMo62/uPJ5pxI4hjMiq14ae8UdtmrafmfLlsrYkcPxmNWa0NRaJ77BfYfkfPksXrPyGEVVUDZkjPB/cdQ8Tpr6Tc8tr6DY6YRWfn8Jpakm7PGOF+4aj4jkc7z+jwWKEHXNML9wBP25hkif0mDSxE64pjbuIB+/I5+bi0Cdsh8uYZBbi16dsZ8/V//EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8AKf/EABoRAAICAwAAAAAAAAAAAAAAAAARAVAQMED/2gAIAQMBAT8ArGPomoYx186Iz//Z");

  const { t } = useTranslation();
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwt="))
    ?.split("=")[1];

  React.useEffect(() => {
    if (!id) return;
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/chat/settings/get-user?id=${id}`, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    }).then(res => res.json())
      .then(data => {
        setAdminName(data.name);
        setEmail(data.email);
        setNotificationsEnabled(data.notificationsEnabled);
        setNotificationSound(data.notificationSound);
        setNotificationFrequency(data.notificationFrequency);
        if(data?.avatarUrl){
          setAvatarUrl(data.avatarUrl);
        }
      });
  }, [id]);

  const handleSave = async () => {
    await fetch(process.env.REACT_APP_API_BASE_URL+"/api/chat/settings/update-profile", {
      "method": "PATCH",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      "body": JSON.stringify({
        "id": id,
        "name": adminName,
        "email": email,
        "password": password,
        "notificationsEnabled": notificationsEnabled,
        "notificationSound": notificationSound,
        "notificationFrequency": notificationFrequency,
        "avatarUrl": avatarUrl,
      })
    });
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    const url = await uploadFileToSupabase(file);
    setAvatarUrl(url);
  };

  return <>
    <form autoComplete="off" onSubmit={(e) => {
      e.preventDefault();
      handleSave();
    }}>
      <h1>{t("profile")}</h1>
      <div className="avatarUpload">
        <img src={avatarUrl} alt="Avatar" className="avatarPreview" />
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="avatarInput" />
      </div>

      <div className="formGroup">
        <label>{t("name")}</label>
        <input
          type="text"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)} />
      </div>
      <div className="formGroup">
        <label>{t("email")}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="formGroup">
        <label>{t("notificationFrequency")}</label>
        <select
          value={notificationFrequency}
          onChange={(e) => setNotificationFrequency(e.target.value)}
        >
          <option value="instant">{t("instant")}</option>
          <option value="hourly">{t("hourly")}</option>
          <option value="daily">{t("daily")}</option>
          <option value="weekly">{t("weekly")}</option>
        </select>
      </div>
      <hr />
      <div className="formGroup">
        <label>{t("newPassword")}</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="formGroup">
        <label>{t("confirmPassword")}</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      <button className="saveButton">{t("saveSettings")}</button>
    </form>
  </>;
};
