using System;
using System.Configuration;

namespace O365WebClient
{
	public class AppSettings
	{
		public static TSettingType GetAppSetting<TSettingType>(string appSetting)
		{
			TSettingType settingValue;
			var settingString = ConfigurationManager.AppSettings[appSetting];
			if (settingString == null)
			{
				throw new ConfigurationErrorsException(
					String.Format("The required App setting '{0}' was not found in the app or web config file.", appSetting));
			}
			try
			{
				settingValue = (TSettingType)Convert.ChangeType(settingString, typeof(TSettingType));
			}
			catch (Exception ex)
			{
				throw new ConfigurationErrorsException(
					string.Format("The required App setting '{0}' was invalid: {1}", appSetting, ex.Message), ex);
			}
			return settingValue;
		}
	}
}